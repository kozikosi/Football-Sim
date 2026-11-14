// v3 §7.2 experiment — run the vendor digest (tier1.mjs vendorSha algorithm) on
// (1) an LF extract of colors/ @ d3bd81d2  -> expect 432a1701…195e272d, 112 files
// (2) the same bytes with every text file converted LF->CRLF -> expect 7af52799…, 112 files
// (The conversion touches text files only; .woff2/.png etc. stay byte-identical.)
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

function vendorSha(root) {
  const files = [];
  (function walk(d) {
    for (const f of fs.readdirSync(d, { withFileTypes: true })) {
      const p = path.join(d, f.name);
      if (f.isDirectory()) walk(p);
      else files.push(p);
    }
  })(root);
  files.sort();
  const h = crypto.createHash('sha256');
  for (const f of files) { h.update(path.relative(root, f)); h.update(fs.readFileSync(f)); }
  return { digest: h.digest('hex'), files: files.length };
}

const BASE = '/home/z/my-project/work/digest-exp';
const LF = path.join(BASE, 'lf', 'colors');
const CRLF = path.join(BASE, 'crlf', 'colors');

fs.rmSync(BASE, { recursive: true, force: true });
fs.mkdirSync(path.join(BASE, 'lf'), { recursive: true });
fs.mkdirSync(path.join(BASE, 'crlf'), { recursive: true });

// extract the SAME bytes twice from the same git object store (archive beats tree)
execSync('git archive d3bd81d2 -- colors | tar -x -C ' + path.join(BASE, 'lf'), { cwd: '/home/z/my-project/boot' });
execSync('git archive d3bd81d2 -- colors | tar -x -C ' + path.join(BASE, 'crlf'), { cwd: '/home/z/my-project/boot' });

// CRLF conversion: any file containing no \r and decoding as binary-ish text gets \n -> \r\n
let converted = 0;
(function conv(d) {
  for (const f of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, f.name);
    if (f.isDirectory()) conv(p);
    else {
      const b = fs.readFileSync(p);
      if (!b.includes(0x0d) && !b.includes(0) && b.length > 0) {   // no CR yet, no NUL (text-ish)
        fs.writeFileSync(p, Buffer.from(b.toString('utf8').replace(/\n/g, '\r\n'), 'utf8'));
        converted++;
      }
    }
  }
})(CRLF);

const a = vendorSha(LF);
const b = vendorSha(CRLF);
console.log('LF   colors/ @ d3bd81d2:', a.digest, '· files', a.files);
console.log('CRLF same tree       :', b.digest, '· files', b.files, `· (${converted} files converted)`);
console.log('expect LF  = 432a1701744b91fc92f807931d789cf49a8daf0da529298f0013898f195e272d');
console.log('expect CRLF= 7af5279953be55d74bfcf656bb6c48b08cf44c18661ba72d83e3e6d1e8c29072');
console.log('LF match  :', a.digest === '432a1701744b91fc92f807931d789cf49a8daf0da529298f0013898f195e272d');
console.log('CRLF match:', b.digest === '7af5279953be55d74bfcf656bb6c48b08cf44c18661ba72d83e3e6d1e8c29072');
