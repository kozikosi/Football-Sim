const fs = require("node:fs");
const content = fs.readFileSync(
  "Madden NFL 27 Team Power Rankings & Draft Simulator (7).html",
  "utf8",
);

// The file has the entity & (bytes: 26 61 6d 70 3b)
// Create the search string from the exact bytes
const oldBytes = Buffer.from(
  "4c696e6575702026616d703b20666c65783c2f68343e",
  "hex",
);
const oldStr = oldBytes.toString("utf8");

const newStr = "Lineup & flex (returner in Special Teams)</h4>";

console.log("Searching for:", oldStr);
console.log("includes:", content.includes(oldStr));

if (content.includes(oldStr)) {
  const newContent = content.replace(oldStr, newStr);
  fs.writeFileSync(
    "Madden NFL 27 Team Power Rankings & Draft Simulator (7).html",
    newContent,
  );
  console.log("Done!");
} else {
  console.log("NOT FOUND");
}
