// Install file system package
const fs = require("fs");
// Install util package
const util = require("util");

// Promisify readFile and writeFile to return promise
const readFromFile = util.promisify(fs.readFile);
const writeToFile = util.promisify(fs.writeFile);

async function readAndWriteToFile(fileName, note) {
    try {
        // read data from file
        const data = await readFromFile(fileName, 'utf-8')
        // Declare parsedData as array
        let parsedData = [];
        if (data) {
            // parse file data to convert into Javascript object of type array
            parsedData = JSON.parse(data);
            // push new note to array
            parsedData.push(note);
        } else {
            parsedData.push(note);
        }
        // Write to file passed
        await writeToFile(fileName, JSON.stringify(parsedData))
        // return added note as a result
        return note;
    } catch (err) {
        // In case of exceptions, log error to console
        console.log(err)
    }
}

async function deleteNoteFromFile(fileName, id) {
    try {
        // read data from file
        const data = await readFromFile(fileName, 'utf-8')
        // Declare parsedData as array
        let parsedData = [];
        // function defined to filter out note by id
        function filterById(note, id) {
            if (note.id !== "" && note.id !== id) {
                return true;
            } else {
                return false;
            }
        }
        if (data) {
            // parse file data to convert to Javascript object of type array
            parsedData = JSON.parse(data);
        } else {
            // If notes not available for deletion, return appropriate message and delete
            return {
                message: 'Notes not available for deletion',
                statusCode: '200',
                Notes: [{}]
            }
        }
        const filteredData = parsedData.filter((note) => filterById(note, id))
        if (filteredData.length === parsedData.length) {
            return {
                message: 'Note id entered for deletion is invalid',
                statusCode: '404',
                Notes: filteredData
            }
        }
        else if (filteredData.length > 0) {
            await writeToFile(fileName, JSON.stringify(filteredData));
            return {
                message: 'Note Deleted',
                statusCode: '200',
                Notes: filteredData
            }
        }
        else {
            await writeToFile(fileName, '')
            return {
                message: 'All Notes Deleted Successfully',
                statusCode: '200',
                Notes: [{}]
            }
        }
    } catch (err) {
        // In case of exceptions, log error to console
        console.log(err)
    }
}
module.exports = { readFromFile, readAndWriteToFile, deleteNoteFromFile }