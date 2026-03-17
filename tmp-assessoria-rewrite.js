const fs = require('fs');
const content = fs.readFileSync('src/pages/Assessoria.tsx', 'utf-8');
const lines = content.split('\n');
const startIndex = lines.findIndex(l => l.includes('export default function Assessoria() {'));
// Read only the constants definition which are unchanged
const importsEnd = lines.findIndex(l => l.includes('const oficiosDetalhados'));
console.log(importsEnd, startIndex);
