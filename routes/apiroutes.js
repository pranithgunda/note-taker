const router = require('express').Router();
//package to generate unique id
const generateUniqueID = require('generate-unique-id');
// Destructure the methods from fsutils
const { readFromFile, readAndWriteToFile } = require('../utils/fsutils')


// route defined to provide notes available
router.get('/notes', (req, res) => {
    readFromFile('./db/db.json')
        .then((data) => {
            // Use res.json to send json data back to client
            res.status(200).json(JSON.parse(data))
        })
        .catch(error => {
            console.error('An error occured while reading file db.json data', error);
            res.status(500).json({ 'error': 'error occured while reading file data' })
        })

})


// route defined to add a new note
router.post('/notes', (req, res) => {
    const { title, text } = req.body;
    if (title && text) {
        const newNote = {
            title,
            text,
            id: generateUniqueID({
                length: 4,
                useLetter: true
            })
        }
        readAndWriteToFile('./db/db.json', newNote)
            .then(result => res.status(200).json(result))
            .catch(error => {
                console.error('An error occured while writing data to file db.json', error);
                res.status(500).json({ 'error': 'error occured while writing data to file db.json' })
            })
    }
    else {
        res.status(400).json('Please enter all details to add a note');
    }

})

module.exports = router;
