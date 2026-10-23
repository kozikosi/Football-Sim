#!/usr/bin/env node

// MiniMax — dependency-free 390px layout probe for the NFL Draft Simulator builds.
//
// Zero installs (council rule): drives an already-running Chromium-family browser over the
// DevTools Protocol using Node's built-in WebSocket (Node >= 22). No npm packages, no Playwright.
//
// Usage:
//   node _agents/kilo/tools/cdp-phone-check.mjs "NFL Draft Simulator v20 Claude.html" [--port 9222]
//   node _agents/kilo/tools/cdp-phone-check.mjs "NFL Draft Simulator v20 Claude.html" --width 390 --height 844
//
// Start a browser first, e.g. (macOS Brave):
//   "/Applications/Brave Browser.app/Contents/MacOS/Brave Browser" --headless=new \
//     --remote-debugging-port=9222 --user-data-dir=/tmp/kilo-profile about:blank
//
// Exit codes (tests/CONTRACT.md v2 style): 0 = no overflow found, 1 = findings, 4 = usage/parse error.

import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

const argv = process.argv.slice(2);
const flags = {};
const positional = [];
for (let i = 0; i < argv.length; i++) {
	if (argv[i].startsWith("--"))
		flags[argv[i].slice(2)] =
			argv[i + 1] && !argv[i + 1].startsWith("--") ? argv[++i] : true;
	else positional.push(argv[i]);
}
const target = positional[0];
const port = String(flags.port || 9222);
const width = Number(flags.width || 390);
const height = Number(flags.height || 844);
const fromWidth = flags["from-width"] ? Number(flags["from-width"]) : null; // load wide, then shrink (rotation/resize path)
const resizeSeq = flags.resize
	? String(flags.resize).split(",").map(Number)
	: null; // e.g. --resize 390,1280,390
const clickId = flags.click ? String(flags.click) : null; // element id to click before measuring
if (!target) {
	console.error(
		"usage: cdp-phone-check.mjs <file-or-url> [--port 9222] [--width 390] [--height 844]",
	);
	process.exit(4);
}

// --- in-page measurement: element-level overflow, not just documentElement.scrollWidth ---
const PROBE = `(() => {
  const vw = window.innerWidth;
  const de = document.documentElement;
  const offenders = [];
  for (const el of document.querySelectorAll('body *')) {
    const cs = getComputedStyle(el);
    if (cs.display === 'none' || cs.visibility === 'hidden') continue;
    const r = el.getBoundingClientRect();
    if (!r.width && !r.height) continue;
    if (r.right > vw + 1 || r.left < -1) {
      const p = el.parentElement;
      offenders.push({
        tag: el.tagName.toLowerCase(),
        id: el.id || '',
        cls: (el.className && el.className.toString ? el.className.toString().slice(0, 40) : ''),
        left: Math.round(r.left), right: Math.round(r.right), width: Math.round(r.width),
        parentOverflowX: p ? getComputedStyle(p).overflowX : '',
        parentClientWidth: p ? p.clientWidth : 0,
        text: (el.innerText || '').replace(/\\s+/g, ' ').slice(0, 60)
      });
    }
  }
  return JSON.stringify({
    url: location.href,
    innerWidth: vw,
    documentScrollWidth: de.scrollWidth,
    bodyScrollWidth: document.body.scrollWidth,
    bodyOverflowX: getComputedStyle(document.body).overflowX,
    pageOverflowPx: de.scrollWidth > vw ? de.scrollWidth - vw : 0,
    visibleViews: [...document.querySelectorAll('[id^=view]')].filter(e => getComputedStyle(e).display !== 'none').map(e => e.id),
    offenders: offenders.slice(0, 25),
    offenderCount: offenders.length
  });
})()`;

class CDP {
	constructor(ws) {
		this.ws = ws;
		this.id = 0;
		this.pending = new Map();
		this.sessionId = null;
		this.events = [];
	}
	static async connect(url) {
		const ws = new WebSocket(url);
		await new Promise((res, rej) => {
			ws.onopen = res;
			ws.onerror = (_e) => rej(new Error("ws error"));
		});
		const c = new CDP(ws);
		ws.onmessage = (ev) => {
			const msg = JSON.parse(ev.data);
			if (msg.id && c.pending.has(msg.id)) {
				const { res, rej } = c.pending.get(msg.id);
				c.pending.delete(msg.id);
				msg.error ? rej(new Error(JSON.stringify(msg.error))) : res(msg.result);
			} else if (msg.method) c.events.push(msg);
		};
		return c;
	}
	send(method, params = {}, useSession = true) {
		const id = ++this.id;
		const payload = { id, method, params };
		if (useSession && this.sessionId) payload.sessionId = this.sessionId;
		this.ws.send(JSON.stringify(payload));
		return new Promise((res, rej) => this.pending.set(id, { res, rej }));
	}
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

(async () => {
	let version;
	try {
		version = await (
			await fetch(`http://127.0.0.1:${port}/json/version`)
		).json();
	} catch (_e) {
		console.error(
			`cannot reach a browser on 127.0.0.1:${port} — start one with --remote-debugging-port=${port}`,
		);
		process.exit(4);
	}
	const cdp = await CDP.connect(version.webSocketDebuggerUrl);
	const url = /^https?:|^file:/.test(target)
		? target
		: pathToFileURL(resolve(target)).href;
	const { targetId } = await cdp.send(
		"Target.createTarget",
		{ url: "about:blank" },
		false,
	);
	const { sessionId } = await cdp.send(
		"Target.attachToTarget",
		{ targetId, flatten: true },
		false,
	);
	cdp.sessionId = sessionId;
	await cdp.send("Page.enable");
	await cdp.send("Runtime.enable");
	await cdp.send("Log.enable");
	if (fromWidth)
		await cdp.send("Emulation.setDeviceMetricsOverride", {
			width: fromWidth,
			height,
			deviceScaleFactor: 1,
			mobile: false,
		});
	await cdp.send("Page.navigate", { url });
	await sleep(2500); // let the app boot and the 150ms mobile transform settle
	if (fromWidth) {
		await cdp.send("Emulation.setDeviceMetricsOverride", {
			width,
			height,
			deviceScaleFactor: 1,
			mobile: false,
		});
		await sleep(1200); // resize path: the debounced transform pass
	}
	if (resizeSeq) {
		for (const w of resizeSeq) {
			await cdp.send("Emulation.setDeviceMetricsOverride", {
				width: w,
				height,
				deviceScaleFactor: 1,
				mobile: false,
			});
			await sleep(900); // let the 150ms debounced transform pass run
		}
	}
	if (clickId) {
		await cdp.send("Runtime.evaluate", {
			expression: `(()=>{const e=document.getElementById(${JSON.stringify(clickId)}); if(e) e.click(); return !!e;})()`,
		});
		await sleep(800);
	}
	const errors = cdp.events
		.filter(
			(e) =>
				e.method === "Runtime.exceptionThrown" || e.method === "Log.entryAdded",
		)
		.map(
			(e) =>
				e.params.exceptionDetails?.exception?.description ||
				e.params.entry?.text,
		)
		.filter(Boolean);
	const res = await cdp.send("Runtime.evaluate", {
		expression: PROBE,
		returnByValue: true,
	});
	const report = JSON.parse(res.result.value);
	report.pageErrors = errors;
	report.viewport = { width, height };
	console.log(JSON.stringify(report, null, 2));
	await cdp.send("Target.closeTarget", { targetId }, false);
	cdp.ws.close();
	const failed = report.offenderCount > 0 || errors.length > 0;
	process.exit(failed ? 1 : 0);
})().catch((e) => {
	console.error(String(e));
	process.exit(4);
});
