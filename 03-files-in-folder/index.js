const path = require('path');
const fsp = require('fs/promises');
const fs = require('fs');

const fileName = "secret-folder";
const getPath = (filename) => path.join(__dirname, filename);
const pathToDir = getPath(fileName);

const getStatsFiles = async (pathToDir) => {
    const data = await fsp.readdir(pathToDir, { withFileTypes: true });
    const files = data.filter(file => file.isFile());
    files.forEach(file => {
        const pathToFile = getPath(path.join(fileName, file.name));
        const ext = path.extname(pathToFile);
        const name = path.basename(pathToFile, ext);
        fs.stat(pathToFile, (error, stats) => {
            console.log(`${name} - ${ext.slice(1)} - ${stats.size}b`);
        });
    });
};

getStatsFiles(pathToDir);


