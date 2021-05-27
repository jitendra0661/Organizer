#!/usr/bin/env node
let fs = require("fs");
let path = require("path");

let inputArr = process.argv.slice(2);
let helpObj = require("./commands/help");
let treeObj = require("./commands/tree");
let organizeObj = require("./commands/organize");
// console.log(inputArr);
// node main.js tree "directoryPath"
// node main.js organize "directoryPath"
// node main.js help
let command = inputArr[0];     // command that we want to execute such as tree,organize or help
// console.log(command);
switch(command) {
    case "tree":
        treeObj.treeKey(inputArr[1]);
        break;
    case "organize":
        organizeObj.organizeKey(inputArr[1]);
        break;
    case "help":
        helpObj.helpKey();
        break;
    default:
        console.log("Please 🙏 input correct command");
        break;
} 




