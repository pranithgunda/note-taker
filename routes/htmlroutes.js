const router = require('express').Router();
const path = require('path')
const currentDirectory = __dirname;
// Navigate up one level in directory structure, to effectively get the base directory path
const baseDirectory = path.resolve(currentDirectory, '..')

// get route for the notes page
router.get('/notes', (req, res) =>
    // Use path.join to return single normalized path
    res.sendFile(path.join(baseDirectory, 'public/notes.html')))


// route to home page for wildchar 
router.get('*', (req, res) =>
    // Use path.join to return single normalized path
    res.sendFile(path.join(baseDirectory, 'public/index.html')))

module.exports = router;
