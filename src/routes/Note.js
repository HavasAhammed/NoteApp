const express = require('express');
const router = express.Router();

const Note = require('./../models/note');

router.post('/list', async (req, res) => {
    var notes = await Note.find({ userId: req.body.userId });
    res.json(notes);
});

router.post('/add', async (req, res) => {

    await Note.deleteOne({ id: req.body.id });

    res.json(req.body);
    var newNote = new Note({
        id: req.body.id,
        userId: req.body.userId,
        title: req.body.title,
        content: req.body.content,
    });

    await newNote.save();

    const response = { message: 'Note added successfully', note: newNote };
    res.json(response);
});

router.post('/delete', async (req, res) => {
    await Note.deleteOne({ id: req.body.id });
    const response = { message: 'Note deleted successfully' };
    res.json(response);
});

module.exports = router;