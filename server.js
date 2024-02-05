"use strict";

const express = require('express'),
  api = require('./routes/notes'),
  path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app
  .use('/api', api)
  .use(express.static('public')) // serve static assets
  .use('/notes', (req, res) => {
    // serve notes page
    res.sendFile(path.join(__dirname, '/public/notes.html'))
  })
  .use('*', (req, res) => {
    // default/wildcard is homepage
    res.sendFile(path.join(__dirname, '/public/index.html'))
  })
  .listen(PORT, () => console.log(`Listening on port ${PORT}`));
