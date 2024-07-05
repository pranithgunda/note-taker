const router = require('express').Router();
//package to generate unique id to save note with this unique id
const generateUniqueID = require('generate-unique-id');
// Destructure the methods from fsutils
const { readFromFile, readAndWriteToFile, deleteNoteFromFile } = require('../utils/fsutils')


// route defined to fetch notes available
router.get('/notes', (req, res) => {
    readFromFile('./db/db.json')
        .then((data) => {
            if (data.length > 0) {
                // Use res.json to send json data back to client
                res.status(200).json(JSON.parse(data))
            }
            else {
                // If file is empty return success with message
                res.status(200).json({ message: 'Notes added are empty' })
            }
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
        // Construct new note with entered information to save
        const newNote = {
            title,
            text,
            id: generateUniqueID({
                length: 4,
                useLetter: true
            })
        }
        // function to read entered notes and write to file with appended note
        readAndWriteToFile('./db/db.json', newNote)
            .then(result => res.status(200).json(result))
            .catch(error => {
                console.error('An error occured while writing data to file db.json', error);
                res.status(500).json({ 'error': 'error occured while writing data to file db.json' })
            })
    }
    else {
        res.status(400).json({ 'error': 'Please enter all details to add a note' });
    }

})

//route defined to delete a note
router.delete('/notes/:id', (req, res) => {
    const id = req.params.id;
    if (id) {
        // function defined to read notes, delete note and write remaining notes to file
        deleteNoteFromFile('./db/db.json', id)
            .then(result => {
                if (result.statusCode === '200') {
                    // Have to pass status code value instead of property reference to avoid express warning written to console
                    res.status(200).json(result)
                }
                else if (result.statusCode === '404') {
                    res.status(404).json(result)
                } else {
                    res.json(result)
                }
            }
            )
            .catch(error => {
                console.error('An error occured while deleting note', error);
                res.status(500).json({ 'error': 'error occured while deleting note' })
            })

    } else {
        res.status(400).json({ 'error': 'Provide note id for deletion' })
    }
})

module.exports = router;
