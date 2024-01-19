const fs = require('fs');
const fsp = require('fs/promises');
const path = require('path');

const getPath = (filename) => path.join(__dirname, filename);
const fileTemplate = "template.html";
const fileComponents = "components";
const fileIndex = "index.html";
const pathToDist = getPath("project-dist");

/* создание index.html - начало */

async function createIndexHtml() {
    try {
        let template = (await fsp.readFile(getPath(fileTemplate))).toString();
        const data = await fsp.readdir(getPath(fileComponents), { withFileTypes: true });
        data.map(async (file) => {
            //читаем данные файлов в папке components
            const fileData = (await fsp.readFile(getPath(`${fileComponents}/${file.name}`))).toString();
            //записываем в шаблон толтко данные html файлов
            let newTemplate;
            if (file.name.split('.')[1] === 'html') {
                newTemplate = template.replace(`{{${file.name.split('.')[0]}}}`, fileData);
                template = newTemplate;
            }
            //создаем директорию project-dist
            fs.mkdir(pathToDist,
                { recursive: true },
                (err) => {
                    if (err) {
                        return console.error(err);
                    }
                    //console.log('Directory created successfully!\n');
                });
            fs.writeFile(`${pathToDist}/${fileIndex}`, newTemplate, function (error) {
                if (error) {
                    return console.log(error);
                }
                //console.log("File successfully recorded");
            });
        });

    } catch (error) {
        console.error(`Got an error trying to read the file: ${error.message}`);
    }
}
createIndexHtml();
/* создание index.html - конец */

/* создание style.css - начало */
const style = "project-dist/style.css";
const dirName = "styles";
const bundle = [];

const pathToDir = getPath(dirName);

const createStyleCss = async (pathToDir) => {
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
            fs.writeFile(getPath(style), bundle.join(''), function (error) {
                if (error) {
                    return console.log(error);
                }
                //console.log("File successfully recorded");
            });
        });
    });
};
createStyleCss(pathToDir);

/* создание style.css - конец */

/* создание assets - начало */
const fileName = "assets";
const fileNameCopy = "project-dist/assets";

    fs.cp(getPath(fileName), getPath(fileNameCopy),{recursive: true} ,function (error) {
    if (error) {
        console.error('The file could not be copied\n', error);
    }
    //console.log("File successfully copy");
});  


/* создание assets - конец */