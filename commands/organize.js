let fs = require("fs");
let path = require("path");
let types = require("../util");

function organizeFn(dirPath) {
    // console.log("organize command implemented for", dirPath);
    // 1. input -> directory path given
    let destPath;
    if(dirPath==undefined) {
        destPath = process.cwd();   
        return;
    } else {
        let doesExist = fs.existsSync(dirPath);
        if(doesExist) {
        // 2. create -> put organized files in a new folder i.e., directory named organized files
            destPath = path.join(dirPath, "organized_files");
            if(fs.existsSync(destPath)==false) {
                fs.mkdirSync(destPath);
            }
        } else {
            console.log("Kindly enter the correct path");
            return;
        }
    }

    organizeHelper(dirPath, destPath);
}

function organizeHelper(src, dest) {
    // 3. identify categories of all the files present in that input directory
    let childNames = fs.readdirSync(src);
    console.log(childNames);
    for(let i = 0; i < childNames.length; i++) {
        let childAddress = path.join(src, childNames[i]);
        let isFile = fs.lstatSync(childAddress).isFile();
        if(isFile) {
            let category = getCategory(childNames[i]);
            console.log(childNames[i], "blongs to --> ", category);
            
            // 4. copy/cut files to that organized directory inside of any category folder
            sendFiles(childAddress, dest, category);
        }
    }
}

function sendFiles(srcFilePath, dest, category) {
    let categoryPath = path.join(dest, category);
    if(fs.existsSync(categoryPath) == false) {
        fs.mkdirSync(categoryPath);
    }
    let fileName = path.basename(srcFilePath);
    let destFilePath = path.join(categoryPath, fileName);
    fs.copyFileSync(srcFilePath, destFilePath);      // to copy files from source to destination
    fs.unlinkSync(srcFilePath);                      // to delete files from source   ----  the above and this line will execute cut feature . If we only want copy feature , then remove this line
    console.log(fileName, "copied to", category);
}

function getCategory(name) {
    let extName = path.extname(name);
    extName = extName.slice(1);
    for(let type in types) {
        let currTypeArr = types[type];
        for(let i = 0; i < currTypeArr.length; i++) {
            if(extName==currTypeArr[i]) {
                return type;
            }
        }
    }
    return "others";
}

module.exports = {
    organizeKey : organizeFn
}