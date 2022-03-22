const fs = require("fs");

function readJsonFile(filePath){
    const data = fs.readFileSync(filePath, {encoding: "utf-8", flag: "r"});

    return JSON.parse(data);
}

module.exports = {readJsonFile}