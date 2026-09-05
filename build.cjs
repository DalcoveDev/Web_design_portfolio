// Build script: compiles Tailwind + bundles JS via esbuild
const { build } = require('esbuild');
const postcss = require('postcss');
const tailwind = require('tailwindcss');
const path = require('path');
const fs = require('fs');

const projectRoot = path.resolve('.');
const cssInput = path.join(projectRoot, 'src', 'styles', 'input.css');
const cssOutput = path.join(projectRoot, 'dist', 'styles.css');
const jsInput = path.join(projectRoot, 'src', 'js', 'main.js');
const jsOutput = path.join(projectRoot, 'dist', 'main.js');

// Step 1: Compile Tailwind CSS
async function compileTailwind() {
  const result = await postcss([
    tailwind(),
  ])
  .process(cssInput, { from: cssInput });
  
  // Minify and write
  const minified = result.css.replace(/[ \t\r\n]+/g, ' ').replace(/;\s*}/g, ';}');
  fs.writeFileSync(cssOutput, minified);
  console.log('✓ Tailwind compiled to', cssOutput);
}

// Step 2: Bundle JS via esbuild
async function bundleJS() {
  await build({
    entryPoints: [jsInput],
    bundle: true,
    minify: true,
    format: 'esm',
    outfile: jsOutput,
    target: 'es2020',
    platform: 'browser',
    treeShaking: true,
    define: {
      'process.env.NODE_ENV': '"production"',
    },
    external: ['gsap', 'gsap/ScrollTrigger', 'gsap/Flip', 'gsap/Draggable'],
    logLevel: 'info',
  });
  console.log('✓ JS bundled to', jsOutput);
}

compileTailwind().then(() => bundleJS())
  .catch(err => {
    console.error('Build failed:', err);
    process.exit(1);
  });