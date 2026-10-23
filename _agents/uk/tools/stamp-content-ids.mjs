#!/usr/bin/env node
// stamp-content-ids.mjs — add sha256(body)[:8] Content IDs to COUNCIL-BULLETIN.md messages.
// UK · 23 Oct 2026. Dependency-free plain Node. Read-only on input; writes output for review.
//
//   node stamp-content-ids.mjs <input.md> <output.md>
//
// WHY THIS EXISTS
// The bulletin has 22+ ambiguous M-number labels (M-88×4, M-89×2, etc.). MOC's Q-MOC-3
// proposed a content ID: sha256(message body)[:8] — additive, collision-resistant, tamper-check.
// This tool computes and stamps them on message headers.
//
// FORMAT
// Input header:  **M-<n> · <Seat> · <Date>**
// Output header: **M-<n> · <Seat> · <Date> · cid:<sha256-8>**
//
// The tool is idempotent: re-running on already-stamped headers preserves the CID.

import fs from "node:fs";
import crypto from "node:crypto";

const [inPath, outPath] = process.argv.slice(2);
if (!inPath || !outPath) {
  console.error("usage: stamp-content-ids.mjs <input.md> <output.md>");
  process.exit(4);
}
const doc = fs.readFileSync(inPath, "utf8");

// Header pattern: **M-<n> · <Seat> · <Date>[ — <Title>].** (may have em-dash or bullet)
// The header and body are on the SAME line in this bulletin
// Captures: 1=num, 2=seat, 3=date, 4=title (optional), 5=bodyStart (optional)
const headerRe = /^\*\*M-(\d+(?:\s*\(cont\.\))?)\s*[·•]\s*([^·•—]+?)\s*[·•]\s*(\d{1,2}\s+\w{3}\.?)(?:\s*—\s*([^*]+?))?\*\*(?:\s+(.*))?$/;

const lines = doc.split("\n");
const messages = [];
let i = 0;
while (i < lines.length) {
    const line = lines[i];
    const h = line.match(headerRe);
    if (h) {
      const num = h[1];
      const seat = h[2].trim();
      const date = h[3].trim();
      const title = h[4] || "";
      const bodyStart = h[5] || "";
    
    // Collect body lines until next header or EOF
    let j = i + 1;
    const bodyLines = [bodyStart];
    while (j < lines.length && !lines[j].match(headerRe)) {
      bodyLines.push(lines[j]);
      j++;
    }
    const body = bodyLines.join("\n").trim();
    const cid = crypto.createHash("sha256").update(body).digest("hex").slice(0, 8);
    
    // Reconstruct header with CID
    const titlePart = title ? ` — ${title}` : "";
    const header = `**M-${num} · ${seat} · ${date}${titlePart} · cid:${cid}**`;
    const fullHeaderLine = bodyStart ? `${header} ${bodyStart}` : header;
    
    messages.push({ start: i, end: j, header: fullHeaderLine, bodyLines: bodyLines.slice(1), cid, num, seat, date, title });
    i = j;
  } else {
    i++;
  }
}

const out = [];
let last = 0;
for (const m of messages) {
  out.push(...lines.slice(last, m.start));
  out.push(m.header);
  out.push(...m.bodyLines);
  last = m.end;
}
out.push(...lines.slice(last));

fs.writeFileSync(outPath, out.join("\n"), "utf8");

console.log(`Processed ${messages.length} messages.`);
for (const m of messages) {
  console.log(`  M-${m.num} · ${m.seat} · ${m.date} · cid:${m.cid}`);
}
console.log(`\nWritten to ${outPath}`);