// Install file system
const fs = require("fs");
// Install util
const util = require("util");

// Promisify readFile and writeFile to return promise
const readFromFile = util.promisify(fs.readFile);
const writeToFile = util.promisify(fs.writeFile);

async function readAndWriteToFile(fileName, note) {
    try {
        // read data from file
        const data = await readFromFile(fileName, 'utf-8')
        // parse file data to convert to Javascript object
        const parsedData = JSON.parse(data);
        // push new note to array
        parsedData.push(note);
        // Write to file passed
        await writeToFile(fileName, JSON.stringify(parsedData))
        // return added note as a result
        return note;
    } catch (err) {
        // In case of exceptions, log error to console
        console.log(err)
    }
}
module.exports = { readFromFile, readAndWriteToFile }