import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { extname, join, relative } from 'node:path';

const sourceExtensions = new Set(['.astro', '.css', '.html', '.js', '.jsx', '.json', '.ts', '.tsx']);
const buildExtensions = new Set(['.css', '.html', '.js']);
const sourceRules = [
  ['Webflow runtime or hosted assets', /(?:webflow(?:\.js|\.schunk|\.io)|cdn\.prod\.website-files\.com)/i],
  ['Webflow generated markup', /(?:data-w-id|data-wf-|w-richtext-|w-commerce-|w-dyn-|w-node-)/i],
  ['jQuery', /(?:\bjquery\b|\$\s*\(\s*document\s*\))/i],
  ['Radix UI', /@radix-ui\//i],
  ['React effects', /\b(?:useEffect|useLayoutEffect)\b/],
];

// React itself may export useEffect in its vendor bundle even when application code never calls it.
// Scan effects in source only. The built output still must contain no Webflow or Radix dependencies.
const buildRules = sourceRules.filter(([label]) => label.startsWith('Webflow') || label === 'Radix UI');

let failed = false;
function scan(dir, extensions, rules) {
  if (!existsSync(dir)) {
    console.error(`Missing directory: ${dir}`);
    failed = true;
    return;
  }
  for (const item of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, item.name);
    if (item.isDirectory()) {
      scan(path, extensions, rules);
      continue;
    }
    if (!item.isFile() || !extensions.has(extname(item.name))) continue;
    const content = readFileSync(path, 'utf8');
    for (const [label, pattern] of rules) {
      if (!pattern.test(content)) continue;
      console.error(`${relative(process.cwd(), path)}: prohibited ${label}`);
      failed = true;
    }
  }
}

scan('src', sourceExtensions, sourceRules);
if (process.argv.includes('--dist')) scan('dist', buildExtensions, buildRules);
if (failed) process.exit(1);
console.log(process.argv.includes('--dist')
  ? 'Source and built output guards passed.'
  : 'Source guard passed.');
