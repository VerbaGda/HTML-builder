const fs = require('fs/promises');
const path = require('path');

const filesDir = path.join(__dirname, 'files');
const filesCopy = path.join(__dirname, 'files-copy');

async function clearDir(directory) {
  const files = await fs.readdir(directory, { withFileTypes: true });

  for (let file of files) {
    const filePath = path.join(directory, file.name);
    if (file.isFile()) {
      await fs.unlink(filePath);
    } else if (file.isDirectory()) {
      await fs.rm(filePath, { recursive: true, force: true });
    }
  }
}

async function copyDirContent(source, destination) {
  const files = await fs.readdir(source);

  for (let file of files) {
    const sourcePath = path.join(source, file);
    const destinationPath = path.join(destination, file);
    const stats = await fs.stat(sourcePath);

    if (stats.isDirectory()) {
      await fs.mkdir(destinationPath, { recursive: true });
      await copyDirContent(sourcePath, destinationPath);
    } else if (stats.isFile()) {
      await fs.copyFile(sourcePath, destinationPath);
    }
  }
}
async function copyDir() {
  await fs.mkdir(filesCopy, { recursive: true });
  await clearDir(filesCopy);
  const files = await fs.readdir(filesDir);

  for (let file of files) {
    const filesPatch = path.join(filesDir, file);
    const copyPath = path.join(filesCopy, file);
    const stats = await fs.stat(filesPatch);

    if (stats.isDirectory()) {
      await fs.mkdir(copyPath);
      await copyDirContent(filesPatch, copyPath);
    } else if (stats.isFile()) {
      await fs.copyFile(filesPatch, copyPath);
    }
  }
  console.log('Copying is complete!');
}

copyDir();
