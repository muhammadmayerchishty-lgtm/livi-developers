import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const srcDir = path.join(rootDir, 'src');
const publicDir = path.join(rootDir, 'public');

console.log('🔍 [LIVI Asset Audit] Scanning codebase for image references...');

function getSourceFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      results = results.concat(getSourceFiles(fullPath));
    } else if (/\.(tsx?|jsx?|html|css|json)$/i.test(file)) {
      results.push(fullPath);
    }
  }
  return results;
}

const sourceFiles = [...getSourceFiles(srcDir), path.join(rootDir, 'index.html')];
const imageRegex = /["'`](\/images\/[a-zA-Z0-9_\-\.\/]+?\.(?:webp|jpg|jpeg|png|svg|avif))["'`]/g;
const referencedImages = new Set();

for (const filePath of sourceFiles) {
  if (!fs.existsSync(filePath)) continue;
  const content = fs.readFileSync(filePath, 'utf8');
  let match;
  while ((match = imageRegex.exec(content)) !== null) {
    referencedImages.add(match[1]);
  }
}

console.log(`📋 Found ${referencedImages.size} unique image references across project.`);

let missingCount = 0;
for (const imgPath of Array.from(referencedImages).sort()) {
  const relativePath = imgPath.replace(/^\//, '');
  const diskPath = path.join(publicDir, relativePath);

  if (!fs.existsSync(diskPath)) {
    console.error(`❌ MISSING ASSET: ${imgPath} (Expected at: ${diskPath})`);
    missingCount++;
  } else {
    // Verify exact case matching for Linux / Vercel case sensitivity
    const dir = path.dirname(diskPath);
    const filename = path.basename(diskPath);
    const dirEntries = fs.readdirSync(dir);
    if (!dirEntries.includes(filename)) {
      console.error(`⚠️  CASE SENSITIVITY MISMATCH: ${filename} does not match exact disk casing in ${dir}`);
      missingCount++;
    }
  }
}

if (missingCount > 0) {
  console.error(`\n🚨 Asset verification failed! ${missingCount} image asset(s) are missing or misnamed.`);
  process.exit(1);
}

console.log(`✅ All ${referencedImages.size} referenced image assets verified successfully on disk! Ready for GitHub and Vercel.\n`);
process.exit(0);
