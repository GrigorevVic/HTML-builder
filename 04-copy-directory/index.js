const fss = require('fs/promises');
const path = require('path');

const fileName = "files";
const fileNameCopy = "files-copy";

const getPath = (filename) => path.join(__dirname, filename);
const pathToDir = getPath(fileName);
const pathToDirCopy = getPath(fileNameCopy);

const copyFiles = async () => {
    await fss.rm(pathToDirCopy, { recursive: true, force: true });
    await fss.mkdir(pathToDirCopy, { recursive: true });
    const data = await fss.readdir(pathToDir, { withFileTypes: true });
    data.forEach(async (file) => {
        const pathToFile = getPath(path.join(fileName, file.name));
        const pathToFileCopy = getPath(path.join(fileNameCopy, file.name));
        try {
            await fss.copyFile(pathToFile, pathToFileCopy);
            console.log(`${file.name}  successfully copied from '${fileName}' to '${fileNameCopy}'`);
        } catch (e) {
            console.error('The file could not be copied\n', e);
        }
    });
}

copyFiles();