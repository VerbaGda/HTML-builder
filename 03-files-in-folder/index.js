const fs = require('fs');
const path = require('path');

const folderPath = path.join(__dirname, 'secret-folder');

function getFileInfo() {
  const files = fs.readdirSync(folderPath, 'utf8');

  for (let file of files) {
    const filePath = path.join(folderPath, file);
    const stats = fs.statSync(filePath);

    if (stats.isFile()) {
      const extname = path.extname(file).slice(1);
      const fileSize = (stats.size / 1024).toFixed(3);
      console.log(`${file} - ${extname} - ${fileSize}kb`);
    }
  }
}
getFileInfo();
