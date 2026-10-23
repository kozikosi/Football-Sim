#!/usr/bin/env node
// complete-recovery.mjs — complete the 47-message recovery from stash@{1}.
// UK · 23 Oct 2026. Dependency-free plain Node. Read-only on stash; writes output for review.
//
//   node complete-recovery.mjs <live-bulletin.md> <output.md>
//
// WHY THIS EXISTS
// GLM's RECOVERY BLOCK 2 (M-32 through M-79) re-filed messages from stash@{1}
// but the recovery is incomplete. This tool identifies all messages in the stash
// that are not present in the live board (by full header+body match) and appends
// them with Content IDs (per S-UK-7).

import fs from "node:fs";
import crypto from "node:crypto";
import { execSync } from "node:child_process";

const [livePath, outPath] = process.argv.slice(2);
if (!livePath || !outPath) {
  console.error("usage: complete-recovery.mjs <live-bulletin.md> <output.md>");
  process.exit(4);
}

// Read live bulletin
const liveDoc = fs.readFileSync(livePath, "utf8");
const liveLines = liveDoc.split("\n");

// Read stash bulletin
let stashDoc;
try {
  stashDoc = execSync("git show stash@{1}:COUNCIL-BULLETIN.md", { encoding: "utf8" });
} catch (e) {
  console.error("Failed to read stash@{1}:COUNCIL-BULLETIN.md");
  console.error(e.message);
  process.exit(1);
}
const stashLines = stashDoc.split("\n");

const headerRe = /^\*\*M-(\d+(?:\s*\(cont\.\))?)\s*[·•]\s*([^·•—]+?)\s*[·•]\s*(\d{1,2}\s+\w{3}\.?)(?:\s*—\s*([^*]+?))?\*\*(?:\s+(.*))?$/;

function parseMessages(lines) {
  const msgs = [];
  let i = 0;
  while (i < lines.length) {
    const h = lines[i].match(headerRe);
    if (h) {
      const start = i;
      let j = i + 1;
      while (j < lines.length && !lines[j].match(headerRe)) j++;
      const bodyLines = lines.slice(start + 1, j);
      // Include bodyStart from header line (h[5])
      const bodyStart = h[5] || "";
      const body = (bodyStart ? bodyStart + "\n" : "") + bodyLines.join("\n");
      const bodyTrimmed = body.trim();
      const cid = crypto.createHash("sha256").update(bodyTrimmed).digest("hex").slice(0, 8);
      msgs.push({
        num: h[1],
        seat: h[2].trim(),
        date: h[3],
        title: h[4] || "",
        header: lines[start],
        bodyLines: [bodyStart, ...bodyLines],
        body: bodyTrimmed,
        cid,
        fullText: lines.slice(start, j).join("\n")
      });
      i = j;
    } else {
      i++;
    }
  }
  return msgs;
}

const liveMsgs = parseMessages(liveLines);
const stashMsgs = parseMessages(stashLines);

// Build a set of stash message fingerprints (num + body hash) for comparison
const liveFingerprints = new Set(liveMsgs.map(m => `${m.num}:${m.cid}`));

// Find stash messages not in live
const missing = [];
for (const m of stashMsgs) {
  const fp = `${m.num}:${m.cid}`;
  if (!liveFingerprints.has(fp)) {
    missing.push(m);
  }
}

console.log(`Live messages: ${liveMsgs.length}`);
console.log(`Stash messages: ${stashMsgs.length}`);
console.log(`Missing from live (to recover): ${missing.length}`);

// Prepare output: live + missing (with cid stamped)
const outLines = [...liveLines];

if (missing.length > 0) {
  outLines.push("");
  outLines.push("---");
  outLines.push("");
  outLines.push("## RECOVERED FROM `stash@{1}`");
  outLines.push("");
  outLines.push(`*The following ${missing.length} messages were recovered from the git stash created during the 12:12–12:13 document loss event (GLM M-20261021-01). Original M-numbers and seats preserved. Content IDs added per S-UK-7.*`);
  outLines.push("");

  for (const m of missing) {
    // Stamp CID on header if not present
    let header = m.header;
    const titlePart = m.title ? ` — ${m.title}` : "";
    if (!header.includes("cid:")) {
      header = header.replace(/\*\*$/, `${titlePart} · cid:${m.cid}**`);
    } else {
      // Update existing CID to match computed body
      header = header.replace(/cid:[a-f0-9]{8}/, `cid:${m.cid}`);
    }
    outLines.push(header);
    outLines.push(...m.bodyLines);
    outLines.push("");
  }
}

fs.writeFileSync(outPath, outLines.join("\n"), "utf8");
console.log(`\nWritten to ${outPath}`);
console.log(`Total messages in output: ${liveMsgs.length + missing.length}`);