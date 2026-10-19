const fs = require('fs');
const content = fs.readFileSync('Madden NFL 27 Team Power Rankings & Draft Simulator (7).html', 'utf8');

// Find the exact location
const idx = content.indexOf('renderYourRosterTab');
const chunk = content.substring(idx + 3000, idx + 4000);
const localIdx = chunk.indexOf('Lineup');
console.log('Local index:', localIdx);

// The exact string to replace
const oldStr = 'Lineup & flex</h4>';
const newStr = 'Lineup & flex (returner in Special Teams)</h4>';

console.log('Old string:', oldStr);
console.log('Chunk at localIdx:', chunk.substring(localIdx, localIdx + oldStr.length));
console.log('Match:', chunk.substring(localIdx, localIdx + oldStr.length) === oldStr);

// Do the replacement in the full content
const fullOldStr = 'Lineup & flex</h4>';
const fullNewStr = 'Lineup & flex (returner in Special Teams)</h4>';

if (content.includes(fullOldStr)) {
    const newContent = content.replace(fullOldStr, fullNewStr);
    fs.writeFileSync('Madden NFL 27 Team Power Rankings & Draft Simulator (7).html', newContent);
    console.log('Done!');
} else {
    console.log('NOT FOUND in full content');
}