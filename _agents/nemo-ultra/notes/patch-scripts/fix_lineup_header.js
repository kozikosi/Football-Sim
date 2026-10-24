const fs = require("node:fs");
const content = fs.readFileSync(
	"/Users/kosi/Desktop/Football Sim/Madden NFL 27 Team Power Rankings & Draft Simulator (7).html",
	"utf8",
);

const oldStr = "Lineup & flex</h4>";
const newStr = "Lineup & flex (returner in Special Teams)</h4>";

if (content.includes(oldStr)) {
	const newContent = content.replace(oldStr, newStr);
	fs.writeFileSync(
		"/Users/kosi/Desktop/Football Sim/Madden NFL 27 Team Power Rankings & Draft Simulator (7).html",
		newContent,
	);
	console.log("Done!");
} else {
	console.log("NOT FOUND");
}
