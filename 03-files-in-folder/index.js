const path = require('path');
const fs = require('fs/promises');
const fss = require('fs');

const fileName = "secret-folder";
const getPath = (filename) => path.join(__dirname, filename);
const pathToDir = getPath(fileName);

const getStatsFiles = async (pathToDir) => {
    const data = await fs.readdir(pathToDir, { withFileTypes: true });
    const files = data.filter(file => file.isFile());
    files.forEach(file => {
        const pathToFile = getPath(path.join(fileName, file.name));
        const ext = path.extname(pathToFile);
        const name = path.basename(pathToFile, ext);
        fss.stat(pathToFile, (error, stats) => {
            console.log(`${name} - ${ext.slice(1)} - ${stats.size}b`);
        });
    });
};

getStatsFiles(pathToDir);


