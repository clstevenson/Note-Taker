"use strict";
///////////////////////////////////////////////////////////////////////////////
//           API for creating, storing, retrieving, deleting notes           //
///////////////////////////////////////////////////////////////////////////////

// create route object
const notes = require('express').Router();
// import UUID module to create unique IDs
const { v4: uuidv4 } = require('uuid');
const fs = require('fs').promises;

// get all of the notes from the DB
notes.get('/', (req, res) => {
  fs.readFile('./db/db.json')
    .then(data => JSON.parse(data))
    .then(data => res.json(data))
    .catch(err => {
      console.log(err);
      res.send("Error in getting data.")
    });
});

// post a new note
notes.post('/', (req, res) => {
  fs.readFile('./db/db.json')
    .then(data => JSON.parse(data))
    .then(data => {
      const ID = uuidv4();
      let newNote = {
        id: ID,
        title: req.body.title,
        text: req.body.text
      };
      data.push(newNote);
      return data;
    })
    .then(data => {
      fs.writeFile('./db/db.json', JSON.stringify(data, null, 2));
      const response = {
        status: "success",
        body: data
      }
      res.json(response);
    })
    .catch(err => {
      console.log(err);
      res.send("Error in saving note.")
    });
});

// delete a note
notes.delete('/:id', (req, res) => {
  const ID = req.params.id;
  fs.readFile('./db/db.json')
    .then(data => JSON.parse(data))
    .then(data => data.filter(note => note.id !== ID))
    .then(data => {
      fs.writeFile('./db/db.json', JSON.stringify(data, null, 2));
      const response = {
        status: "success",
        body: data
      }
      res.json(response);
    })
    .catch(err => {
      console.log(err);
      res.send("Error in saving note.")
    });
});

module.exports = notes;
