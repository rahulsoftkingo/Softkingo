const fs = require('fs');

const files = [
    'src/app/(admin)/admin/solutions/_components/CloneEditor.jsx',
    'src/app/(admin)/admin/solutions/_components/IndustryEditor.jsx',
    'src/app/(admin)/admin/solutions/_components/SolutionEditor.jsx'
];

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');

    // Pattern 1 (Map)
    content = content.replace(/onChange=\{e => \{\s*const [a-zA-Z0-9_]+ = \([^)]+\)\.map\(\(el, idx\) => idx === i \? \{ \.\.\.el, ([a-zA-Z0-9_]+): e\.target\.value \} : el\);\s*updateField\('([^']+)', [a-zA-Z0-9_]+\);\s*\}\}/g,
        'onChange={e => updateField(`$2.${i}.$1`, e.target.value)}');

    // Pattern 2 (Arr assignment without if)
    content = content.replace(/onChange=\{e => \{\s*const arr = \[\.\.\.\([^)]+\)\];\s*arr\[([a-zA-Z0-9_]+)\]\.([a-zA-Z0-9_]+) = e\.target\.value;\s*updateField\('([^']+)', arr\);\s*\}\}/g,
        'onChange={e => updateField(`$3.${$1}.$2`, e.target.value)}');

    // Pattern 3 (Arr assignment with if)
    content = content.replace(/onChange=\{e => \{\s*const arr = \[\.\.\.\([^)]+\)\];\s*if\s*\([^)]+\)\s*\{\s*arr\[([a-zA-Z0-9_]+)\]\.([a-zA-Z0-9_]+) = e\.target(?:.checked|.value);\s*updateField\('([^']+)', arr\);\s*\}\s*\}\}/g,
        'onChange={e => updateField(`$3.${$1}.$2`, e.target.type === \'checkbox\' ? e.target.checked : e.target.value)}');

    // Pattern 4 (Arr assignment with if and nested arrays)
    content = content.replace(/onChange=\{e => \{\s*const arr = \[\.\.\.\([^)]+\)\];\s*if\s*\([^)]+\)\s*\{\s*arr\[i\]\.items\[([a-zA-Z0-9_]+)\]\.([a-zA-Z0-9_]+) = e\.target\.value;\s*updateField\('([^']+)', arr\);\s*\}\s*\}\}/g,
        'onChange={e => updateField(`$3.${i}.items.${$1}.$2`, e.target.value)}');

    // Pattern 5 (Direct mapped assignment) - Used in appModules string array
    // arr[i] = e.target.value; updateField('content.userApp.features', arr);
    content = content.replace(/onChange=\{e => \{\s*const arr = \[\.\.\.\([^)]+\)\];\s*arr\[i\] = e\.target\.value;\s*updateField\('([^']+)', arr\);\s*\}\}/g,
        'onChange={e => updateField(`$1.${i}`, e.target.value)}');

    fs.writeFileSync(file, content);
    console.log(file, 'fixed successfully in place.');
});
