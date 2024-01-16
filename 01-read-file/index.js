const path = require('path'); 
const fs = require('fs');

const getPath = (fileName) => path.join(__dirname, fileName);

const fileName = "text.txt";

const readableStream = fs.createReadStream(getPath(fileName));

readableStream.on("data", function(chunk){ 
    console.log(chunk.toString());
});

