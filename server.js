"use strict";

const express = require('express'),
  api = require('./routes/notes'),
  path = require('path'),
  fs = require('fs').promises,
  app = express(),
  PORT = process.env.PORT || 3000;

// module to generate unique IDs
const { v4: uuidv4 } = require('uuid');

// need to be able to parse JSON data
app.use(express.json());

/*
 * API Routes: retrieving, saving, deleting notes
 */

// get all of the notes from the DB
app.get("/api/notes", (req, res) => {
  fs.readFile('./db/db.json')
    .then(data => JSON.parse(data))
    .then(data => res.json(data))
    .catch(err => {
      console.log(err);
      res.send("Error in getting data.")
    });
});

// post a new note
app.post("/api/notes", (req, res) => {
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

// now serve public/html pages
app
  .use(express.static('public')) // serve static assets
  .use('/notes', (req, res) => { // serve notes page
    res.sendFile(path.join(__dirname, '/public/notes.html'))
  })
  .use('*', (req, res) => { // default/wildcard is homepage
    res.sendFile(path.join(__dirname, '/public/index.html'))
  });

// start listening
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
