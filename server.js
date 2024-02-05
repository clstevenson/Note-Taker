"use strict";

const express = require('express'),
  api = require('./routes/notes'),  // notes API (in routes/notes.js)
  path = require('path'),
  app = express(),
  PORT = process.env.PORT || 3000;

app
  .use(express.json()) // parse JSON data
  .use('/api/notes', api) // API routes: retrieving, saving, deleting notes
  .use(express.static('public')) // serve static assets
  .use('/notes', (req, res) => { // serve notes page
    res.sendFile(path.join(__dirname, '/public/notes.html'))
  })
  .use('*', (req, res) => { // default/wildcard is homepage
    res.sendFile(path.join(__dirname, '/public/index.html'))
  });

// start listening
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
