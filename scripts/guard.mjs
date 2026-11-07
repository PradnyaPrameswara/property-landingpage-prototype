import { readdirSync, readFileSync } from 'node:fs';
import { extname, join, relative } from 'node:path';

const textExtensions = new Set(['.astro', '.css', '.js', '.jsx', '.json', '.ts', '.tsx']);
const disallowed = [
  ['Webflow runtime or hosted assets', /(?:webflow(?:\.js|\.schunk|\.io)|cdn\.prod\.website-files\.com)/i],
  ['Webflow generated markup', /(?:data-w-id|data-wf-|w-richtext-|w-commerce-|w-dyn-|w-node-)/i],
  ['jQuery', /(?:\bjquery\b|\$\s*\(\s*document\s*\))/i],
  ['Radix UI', /@radix-ui\//i],
  ['React effects', /\b(?:useEffect|useLayoutEffect)\b/],
];

let failed = false;
function scan(dir) {
  for (const item of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, item.name);
    if (item.isDirectory()) {
      scan(path);
      continue;
    }
    if (!item.isFile() || !textExtensions.has(extname(item.name))) continue;
    const content = readFileSync(path, 'utf8');
    for (const [label, pattern] of disallowed) {
      if (!pattern.test(content)) continue;
      console.error(`${relative(process.cwd(), path)}: prohibited ${label}`);
      failed = true;
    }
  }
}

scan('src');
if (failed) process.exit(1);
console.log('Source guard passed: no legacy runtime/markup, Radix UI, or React effects.');
