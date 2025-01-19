const fs = require('fs/promises');
const path = require('path');

const stylesDir = path.join(__dirname, 'styles');
const projectDist = path.join(__dirname, 'project-dist');
const bundle = path.join(projectDist, 'bundle.css');

async function mergeStyles() {
  await fs.mkdir(projectDist, { recursive: true });
  const files = await fs.readdir(stylesDir);
  const cssArray = [];

  for (let file of files) {
    const filePatch = path.join(stylesDir, file);
    const stats = await fs.stat(filePatch);

    if (stats.isFile() && path.extname(file) === '.css') {
      const content = await fs.readFile(filePatch, 'utf-8');
      cssArray.push(content);
    }
  }
  await fs.writeFile(bundle, cssArray.join('\n'));
  console.log('The bundle.css file has been successfully created!');
}

mergeStyles();
