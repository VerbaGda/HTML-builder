const fs = require('fs/promises');
const path = require('path');

const distDir = path.join(__dirname, 'project-dist');
const templateDir = path.join(__dirname, 'template.html');
const componentsDir = path.join(__dirname, 'components');
const stylesDir = path.join(__dirname, 'styles');
const assetsDir = path.join(__dirname, 'assets');
const assetsDirCopy = path.join(distDir, 'assets');

async function createPage() {
  async function createFolder() {
    await fs.mkdir(distDir, { recursive: true });
  }
  async function createHtml() {
    let template = await fs.readFile(templateDir, 'utf-8');
    const componentsFiles = await fs.readdir(componentsDir);

    for (let file of componentsFiles) {
      if (path.extname(file) === '.html') {
        const name = path.basename(file, '.html');
        const componentsPath = path.join(componentsDir, file);
        const componentContent = await fs.readFile(componentsPath, 'utf-8');
        const tag = `{{${name}}}`;
        template = template.replace(tag, componentContent);
      }
    }
    await fs.writeFile(path.join(distDir, 'index.html'), template);
  }

  async function createStyles() {
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
    await fs.writeFile(path.join(distDir, 'style.css'), cssArray.join('\n'));
  }
  async function copyAssets(srcDir, destDir) {
    await fs.mkdir(destDir, { recursive: true });
    const files = await fs.readdir(srcDir);

    for (let file of files) {
      const srcPath = path.join(srcDir, file);
      const destPath = path.join(destDir, file);
      const stats = await fs.stat(srcPath);

      if (stats.isDirectory()) {
        await copyAssets(srcPath, destPath);
      } else {
        await fs.copyFile(srcPath, destPath);
      }
    }
  }

  await createFolder();
  await createStyles();
  await copyAssets(assetsDir, assetsDirCopy);
  await createHtml();
}
createPage();
