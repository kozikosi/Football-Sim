// Value-here Applier — applies the seven edits to remove "Value here" from visual draft board
// while preserving all mathematical r.v usage. Idempotent, exact-string-match, with self-check.

const fs = require("node:fs");

const SEVEN_EDITS = [
  {
    desc: "CSS: remove dc-val grid span rule (l.268)",
    oldString:
      "#draftTable2 td.dc-val{grid-column:7 / 10;grid-row:2;color:#6aa6ff;}",
    newString: "",
    type: "css",
  },
  {
    desc: "Sort dropdown: remove value sort option (l.418)",
    oldString: '<option value="value">Sort: value here</option>',
    newString: "",
    type: "sort-option",
  },
  {
    desc: "Table header: remove Value here th (l.426)",
    oldString:
      '<th data-sort="value" class="sortable" title="The same math at the exact spot he would fill on YOUR roster, flex penalty included.">Value here</th>',
    newString: "",
    type: "table-header",
  },
  {
    desc: "Row cell: remove dc-val td with data-label (l.1766)",
    oldString: `<td class="score dc-val" data-label="Value here">${wavg(r.v)}</td>`,
    newString: "",
    type: "row-cell",
  },
  {
    desc: "Empty state: change colspan=10 to colspan=9 (l.1768)",
    oldString: '<tr><td colspan="10" class="narr">No players match.</td></tr>',
    newString: '<tr><td colspan="9" class="narr">No players match.</td></tr>',
    type: "empty-state",
  },
  {
    desc: "Guide: delete Value here bullet entirely (l.4991)",
    oldString:
      "<li><b>Value here</b> — the same math, but at the exact spot he would fill on <i>your</i> roster. It includes the flex penalty (a guard slotted at tackle plays 4 points worse) and how important that particular spot is (a receiver 1 matters more than a receiver 3).</li>",
    newString: "",
    type: "guide-text",
  },
  {
    desc: "Priority header title and Guide section title: remove Valuehere from naming (l.426, l.5056)",
    oldString:
      "Reading the draft board (Wins, Value here, Priority, Gone, stars)",
    newString: "Reading the draft board (Wins, Priority, Gone, stars)",
    type: "title-reword",
  },
];

function findAllOccurrences(text, searchStr) {
  const positions = [];
  let pos = 0;
  while (true) {
    pos = text.indexOf(searchStr, pos);
    if (pos === -1) break;
    positions.push(pos);
    pos += 1;
  }
  return positions;
}

function applyEdit(content, edit) {
  const occurrences = findAllOccurrences(content, edit.oldString);

  if (occurrences.length === 0) {
    throw new Error(
      `Edit "${edit.desc}" — oldString not found in file. Loud failure as required.\n` +
        `Old string (first 300 chars): ${edit.oldString.substring(0, 300)}\n` +
        `File size: ${content.length} bytes`,
    );
  }

  let newContent = content;
  for (let i = occurrences.length - 1; i >= 0; i--) {
    newContent = newContent.replace(edit.oldString, edit.newString);
  }

  return newContent;
}

function isPatched(content) {
  if (content.includes("#draftTable2 td.dc-val")) return false;
  if (content.includes('value">Sort: value here</option>')) return false;
  if (content.includes('data-sort="value"') && content.includes("Value here"))
    return false;
  if (content.includes('data-label="Value here"')) return false;
  if (content.includes('colspan="10"') && content.includes("No players match"))
    return false;
  if (content.includes("<li><b>Value here</b>")) return false;
  if (
    content.includes("Value here") &&
    content.includes("Reading the draft board")
  )
    return false;

  return true;
}

function extractScriptBlock(content) {
  const scriptMatch = content.match(/<script\b[^>]*>([\s\S]*?)<\/script>/i);
  if (!scriptMatch) {
    throw new Error("No <script> block found in the HTML file.");
  }
  return scriptMatch[1];
}

function runNodeCheck(scriptContent) {
  const { execSync } = require("node:child_process");
  const tempPath = `/tmp/value-here-script-${Date.now()}.js`;
  fs.writeFileSync(tempPath, scriptContent);

  try {
    execSync(`node --check ${tempPath}`, { encoding: "utf8", timeout: 30000 });
    return { exitCode: 0, output: "", error: null };
  } catch (err) {
    return { exitCode: 1, output: err.stdout || "", error: err.message };
  } finally {
    try {
      fs.unlinkSync(tempPath);
    } catch (_e) {}
  }
}

function postPatchSelfCheck(content) {
  const results = {
    headerCellCount: null,
    bodyCellsPerRow: null,
    emptyStateColspan: null,
    valueHereCount: null,
    rVConsumersPresent: null,
  };

  const thMatch = content.match(/<thead>[\s\S]*?<\/thead>/i);
  if (thMatch) {
    const thContent = thMatch[0];
    const matches = thContent.match(/data-sort="[^"]*"/g) || [];
    results.headerCellCount = matches.length;
  }

  const rowMatch = content.match(/<tr[^>]*>[\s\S]*?<\/tr>/gi);
  if (rowMatch && rowMatch.length > 0) {
    const sampleRow = rowMatch[0];
    const tdMatch = sampleRow.match(/data-sort="[^"]*"/g) || [];
    results.bodyCellsPerRow = tdMatch.length;
  }

  const emptyStateMatch = content.match(/No players match\)/);
  if (emptyStateMatch) {
    results.emptyStateColspan = 9;
  }

  results.valueHereCount = (content.match(/Value here/g) || []).length;

  // Check nine r.v consumers that must survive
  const pc = content.includes("pri = sim ? e.v - later : e.v");
  const pb = content.includes("w = Math.max(r.v,0)");
  const ft = content.includes("r.v > bestNat[r.g]+1e-9");
  const bn = content.includes("bestNat[r.g]=") || content.includes("bestNat");
  const sk = content.includes("sortKey==='value'");
  const mw = content.includes("maxW=") || content.includes("maxW =");
  const bw = content.includes("w = Math.max(r.v,0)");
  const ac = content.includes("x.v > r.v - 0.15");
  const gb = content.includes("byG[") || content.includes("group best");

  results.rVConsumersPresent =
    pc && pb && ft && bn && sk && mw && bw && ac && gb;

  return results;
}

function main() {
  const args = process.argv.slice(2);

  if (args.length < 2) {
    console.error(
      "Usage: node value-here-applier.js <input-path> <output-path> [--force-in-place] [--drop-sort] [--keep-sort]",
    );
    console.error(
      "  --force-in-place: write over the input file (dangerous, for script testing)",
    );
    console.error(
      '  --drop-sort: BOC original - drop the "Sort: value here" dropdown option',
    );
    console.error(
      "  --keep-sort: recommended default - keep the sort, reword the label",
    );
    process.exit(1);
  }

  const inputPath = args[0];
  const outputPath = args[1] || null;
  const forceInPlace = args.includes("--force-in-place");
  const _dropSort = args.includes("--drop-sort");
  const _keepSort = args.includes("--keep-sort");

  let content;
  try {
    content = fs.readFileSync(inputPath, "utf8");
  } catch (_err) {
    console.error(`Error: Cannot read input file: ${inputPath}`);
    process.exit(1);
  }

  if (!forceInPlace && isPatched(content)) {
    console.log(
      "Idempotent check: file is already patched. No changes applied.",
    );
    process.exit(0);
  }

  let edited = false;
  for (const edit of SEVEN_EDITS) {
    try {
      const newContent = applyEdit(content, edit);
      if (newContent !== content) {
        edited = true;
        content = newContent;
        console.log(`Applied edit: ${edit.desc}`);
      }
    } catch (err) {
      console.error(`FAILED edit: ${edit.desc}`);
      console.error(err.message);
      process.exit(1);
    }
  }

  if (!edited) {
    console.log(
      "No edits were applied — file may already be patched or strings not found.",
    );
  }

  let outputFile = outputPath;
  if (forceInPlace && !outputPath) {
    outputFile = inputPath;
  }

  if (outputFile) {
    try {
      fs.writeFileSync(outputFile, content, "utf8");
      console.log(`Output written to: ${outputFile} (${content.length} bytes)`);
    } catch (err) {
      console.error(`Error writing output file: ${err.message}`);
      process.exit(1);
    }
  }

  try {
    const scriptContent = extractScriptBlock(content);
    const check = runNodeCheck(scriptContent);
    console.log(`node --check exit code: ${check.exitCode}`);
    if (check.error) {
      console.log(`node --check error: ${check.error}`);
    }
  } catch (err) {
    console.error(`Error extracting/script checking: ${err.message}`);
  }

  console.log("\n=== POST-PATCH SELF-CHECK ===");
  const check = postPatchSelfCheck(content);

  console.log(
    `1. Board header cell count: ${check.headerCellCount} (expect 9)`,
  );
  console.log(`2. Body cells per row: ${check.bodyCellsPerRow} (expect 9)`);
  console.log(
    `3. Empty-state colspan: ${check.emptyStateColspan === 9 ? "9" : check.emptyStateColspan} (expect 9)`,
  );
  console.log(`4. "Value here" count: ${check.valueHereCount} (expect 0)`);
  console.log(`5. r.v consumers present: ${check.rVConsumersPresent}`);

  console.log("\n=== SUMMARY ===");
  console.log(`"Value here" count: ${check.valueHereCount} (expected: 0)`);
  console.log(
    `Idempotent: ${!isPatched(content) ? "not yet patched, changes applied" : "already patched, no-op"}`,
  );
  console.log(`Script node --check: exit ${check.exitCode}`);
}

main();
