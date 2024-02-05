"use strict";

// TODO figure out how the front end works (commenting exercise)

const express = require('express'),
      api = require('./routes/notes'),
      path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app
  .use(express.static('public'))
  .use('/notes', (req,res) => // serve the notes page
    res.sendFile(path.join(__dirname, '/public/notes.html')))
  .use('*', (req,res) => // serve the home page as backup
    res.sendFile(path.join(__dirname, '/public/index.html')))
  .listen(PORT, () => console.log(`Listening on port ${PORT}`));
