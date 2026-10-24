const fs = require("node:fs");
const content = fs.readFileSync(
	"Madden NFL 27 Team Power Rankings & Draft Simulator (7).html",
	"utf8",
);

// The file has the entity & (6 characters: & a m p ;)
// Build the string from parts to avoid encoding issues
const oldStr = "Lineup " + "&" + " flex</h4>";
const newStr = "Lineup " + "&" + " flex (returner in Special Teams)</h4>";

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
