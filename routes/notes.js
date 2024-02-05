"use strict";
// create API rotes for saving, retrieving, and deleting notes

// TODO create GET route to return all saved notes as JSON
// TODO create POST route to save current note in db.json (with unique ID)
// TODO create DELETE route to delete a specific note using :id
// - note that the tips.js file in the mini-project does exactly this task

// create route object
const notes = require('express').Router();
// import UUID module to create unique IDs
const { v4: uuidv4 } = require('uuid');
// reading and writing to/from DB file
const fsUtils = require('../helpers/fsUtils');

module.exports = notes;
