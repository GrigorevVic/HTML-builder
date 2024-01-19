const fs = require('fs');
const fsp = require('fs/promises');
const path = require('path');

const getPath = (filename) => path.join(__dirname, filename);
const fileTemplate = "template.html";
const fileComponents = "components";
const fileIndex = "index.html";
const pathToDist = getPath("project-dist");


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