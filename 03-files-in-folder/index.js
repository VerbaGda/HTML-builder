const fs = require('fs/promises');
const path = require('path');

const folderPath = path.join(__dirname, 'secret-folder');

async function getFileInfo() {
  const files = await fs.readdir(folderPath);

  for (let file of files) {
    const filePath = path.join(folderPath, file);
    const stats = await fs.stat(filePath);

    if (stats.isFile()) {
      const extname = path.extname(file).slice(1);
      const fileSize = (stats.size / 1024).toFixed(3);
      console.log(`${file} - ${extname} - ${fileSize}kb`);
    }
  }
}
getFileInfo();
