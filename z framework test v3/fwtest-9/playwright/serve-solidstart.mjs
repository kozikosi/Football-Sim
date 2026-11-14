// Production serve wrapper for arm-solidstart on @solidjs/start 2.x.
// start 2.x ships a fetch handler (dist/server/entry-server.js) + static
// client assets (dist/client/) but no node server runner (vinxi is gone).
// This file serves the statics with correct MIME types and falls back to the
// SSR handler for everything else. Used by the acceptance suite and by
// `npm run start` inside the arm. Port via PORT env (default 4176).
import { createServer } from 'node:http';
import { existsSync, readFileSync, statSync } from 'node:fs';
import { extname, join, normalize, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import app from '../arm-solidstart/dist/server/entry-server.js';

// The built entry exports a srvx-style instance (app.fetch(request) → Response).
const handle = (request) => app.fetch(request);

const CLIENT = resolve(fileURLToPath(new URL('.', import.meta.url)), '../arm-solidstart/dist/client');
const PORT = Number(process.env.PORT ?? 4176);
const MIME = {
	'.html': 'text/html; charset=utf-8',
	'.js': 'text/javascript',
	'.mjs': 'text/javascript',
	'.css': 'text/css',
	'.svg': 'image/svg+xml',
	'.png': 'image/png',
	'.json': 'application/json',
	'.woff2': 'font/woff2',
	'.ico': 'image/x-icon',
	'.map': 'application/json',
};

createServer(async (req, res) => {
	try {
		const url = new URL(req.url ?? '/', 'http://localhost');
		const path = normalize(decodeURIComponent(url.pathname)).replace(/^(\.\.[/\\])+/, '');
		const file = join(CLIENT, path);
		if (
			path !== '/' &&
			!path.endsWith('/') &&
			file.startsWith(CLIENT) &&
			existsSync(file) &&
			statSync(file).isFile()
		) {
			res.writeHead(200, { 'Content-Type': MIME[extname(file)] ?? 'application/octet-stream' });
			return res.end(readFileSync(file));
		}
		const request = new Request(`http://localhost:${PORT}${req.url}`, {
			method: req.method,
			headers: { host: `localhost:${PORT}` },
		});
		const response = await handle(request);
		const headers = { ...Object.fromEntries(response.headers) };
		delete headers['content-encoding'];
		res.writeHead(response.status, headers);
		res.end(Buffer.from(await response.arrayBuffer()));
	} catch (err) {
		res.writeHead(500, { 'Content-Type': 'text/plain' });
		res.end(`serve-solidstart error: ${err?.message ?? err}`);
	}
}).listen(PORT, async () => {
	// start-2.x cold start: the very first render streams the shell only (the
	// lazy route chunk is not loaded yet — measured: req#1 991 B / 0 testids,
	// req#2+ 7634 B / 69 testids). Warm the handler once before declaring
	// readiness so the first served request is a full render.
	await handle(new Request(`http://localhost:${PORT}/`)).catch(() => {});
	console.log(`arm-solidstart (start 2.x) warmed and listening on http://localhost:${PORT}`);
});
