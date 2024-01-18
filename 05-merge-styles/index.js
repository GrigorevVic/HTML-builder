const fs = require('fs');
const fsp = require('fs/promises');
const path = require('path');

const getPath = (filename) => path.join(__dirname, filename);
const fileBundle = "project-dist/bundle.css";

const bundle = [];

const dirName = "styles";
const pathToDir = getPath(dirName);
const getStatsFiles = async (pathToDir) => {
    const data = await fsp.readdir(pathToDir, { withFileTypes: true });
    const files = data.filter((file) => {
        const pathToFile = getPath(path.join(pathToDir, file.name));
        const ext = path.extname(pathToFile);
        if (file.isFile() && ext === '.css') {
            return file;
        }
    });

    files.forEach(async (file) => {
        const pathToFile = getPath(`styles/${file.name}`);
        const readableStream = fs.createReadStream(pathToFile);
        readableStream.on("data", function (chunk) {
            bundle.push(chunk.toString());
            fs.writeFile(getPath(fileBundle), bundle.join(''), function (error) {
                if (error) {
                    return console.log(error);
                }
                //console.log("File successfully recorded");
            });
        });
    });
};
getStatsFiles(pathToDir);
