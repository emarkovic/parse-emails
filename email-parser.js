'use strict';

const fs = require('fs');
const simpleParser = require('mailparser').simpleParser;


// HELP text
if (process.argv[2]) {
    const firstArg = process.argv[2].toLowerCase();
    if (firstArg === "-h" || firstArg == "--h") {
        console.log("USAGE");
        console.log("$ node email-parser.js <PATH TO FOLDER WITH EML FILES> <OUTPUT FILE NAME>")
        console.log("- PATH TO FOLDER WITH EML FILES - folder where the contents are all eml files")
        console.log("- OUTPUT FILE NAME - optional - desired name of output file without file extension")
    
        console.log()
            
        console.log("OUTPUT")
        console.log("Program will generate a text file. File name will default to the name of the root folder provided.")
    
        console.log()
    
        console.log("EXAMPLES");
        console.log("$ node email-parser.js path/to/emls")
        console.log("    - this generates emls.txt in whatever folder the command was run in")
        console.log()
        console.log("$ node email-parser.js path/to/emls example")
        console.log("    - this generates example.txt in whatever folder the command was run in")

        process.exit()
    }
}

// argv[0] is node executable path
// argv[1] is path to this file
const pathToFolder = process.argv[2];
verifyArgs()
const outputFileName = (process.argv[3]|| processPath()) + ".txt";

work();

////////////////////////////////////////////////////////// FUNCTIONS //////////////////////////////////////////////////////////

function verifyArgs() {
    // pathToFolder
    if (pathToFolder === undefined || pathToFolder === null || pathToFolder.trim() === "") {
        console.error("Error: path to folder is required.")
        process.exit()
    }

    // check that its a folder
    if (processPath().includes(".")) {
        console.error("Error: please specify a path to a folder containing eml files.")
    }

    let pathExists = fs.existsSync(pathToFolder)
    if (!pathExists) {
        console.error("Error: specified path does not exist.")
        process.exit()
    }
}

function processPath() {
    const pathArr = pathToFolder.split("\\");
    return pathArr[pathArr.length - 1];
}

function work() {
    const emlFiles = fs.readdirSync(pathToFolder).filter(file => file.includes(".eml") || file.includes(".EML");
    console.log(emlFiles)

    const emlPromises = emlFiles.map(file => {
        const fileBuffer = fs.readFileSync(pathToFolder + "\\" + file)
        return simpleParser(fileBuffer).then(parsed => {
            return file.replace(".eml", "") + "|" + (parsed.text || "").trim()
        })
    });

    Promise.all(emlPromises).then(values => {
        const outputStr = values.join("\n");
        fs.writeFileSync(outputFileName, outputStr)
    })
}
