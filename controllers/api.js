'use strict'

import fs from 'fs'
import path from 'path'
import { Router } from 'express'
import dateFormat from 'dateformat'
import PDFDocument from 'pdfkit'

const router = Router()

var sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./data/notes.sqlite3');

// Create table if it doesn't exist
// Database goes faster if you yell at it
db.serialize(function() {
    db.run("CREATE TABLE IF NOT EXISTS NOTES( \
            id INTEGER PRIMARY KEY AUTOINCREMENT, \
            NAME TEXT, \
            LENGTH TEXT, \
            CREATED TEXT, \
            EDITED TEXT, \
            VALUE TEXT)");
});

// Add a note
router.post('/add', (req, res) => {
  var now = new Date();
  
  // Driver will do escaping
  db.run('INSERT INTO NOTES(CREATED, EDITED, LENGTH, NAME, VALUE) VALUES(?, ?, ?, ?, ?)', [dateFormat(now), dateFormat(now), req.body.noteValue.length, req.body.noteName, req.body.noteValue], function(err) {
    if (err) {
      return console.log(err.message);
    }
    res.json({
      error: "OK",
      lastID: this.lastID
    })
  });
})

// Update a note with a given id
router.put('/:id', (req, res) => {
  var now = new Date();
  let id = parseInt(req.body.id)
  
  if (isNaN(id) || id > 2000000000 || id < 0) {
    res.json({
      error: "Invalid note ID"
    })
  } else {
    db.run('UPDATE NOTES SET EDITED = (?), VALUE = (?), LENGTH = (?) WHERE ID = (?)', [dateFormat(now), req.body.noteValue, req.body.noteValue.length, id], function(err) {
      if (err) {
        return console.log(err.message);
      }
      res.json({
        error: "OK"
      })
    });
  }
})

function isASCII(str, extended) {
    return (extended ? /^[\x00-\xFF]*$/ : /^[\x00-\x7F]*$/).test(str);
}

function getPDF(note, req, res) {
  var doc = new PDFDocument();
  try {
    let noteLocation = req.protocol + '://' + req.get('host') + "/edit/" + note.id;
    let name = note.NAME;
    
    if (!isASCII(note.NAME))
      name = "note"
    
    res.setHeader('Content-Disposition', name + '.pdf');
    
    // Title
    doc.font("./data/Fonts/DejaVuSansMono.ttf").fontSize(30).text(note.NAME, 50, 50)
    let width = doc.widthOfString(note.NAME)
    let height = doc.currentLineHeight() 
    doc.underline(50, 50, width, height, {color: 'blue'}).link(50, 50, width, height, noteLocation)
    
    doc.fontSize(10).text("Created " + note.CREATED, 0, 50, {align: 'right'});
    doc.fontSize(10).text("Edited " + note.EDITED, 0, 65, {align: 'right'});
    
    doc.fontSize(11).text(note.VALUE, 40, 100);
    
    // Value
    doc.pipe(res);
    doc.end();
  } catch (err) {
    console.error('PDF Error: ' + err.message);
  }

  
}

// Get a specific note
router.get('/:id', (req, res) => {
  var id = parseInt(req.params.id)
  var fileType = req.query.fileType
  
  if (isNaN(id) || id > 2000000000 || id < 0) {
    res.json({ notes: [],  error: "Invalid ID" })
  } else {
    let query = "SELECT * FROM NOTES WHERE ID = " + id
    
    db.all(query, [], (err, rows) => {
      if (err) {
        throw err;
        res.json({ notes: [], error: "Error accessing DB" })
      } else {
        if (rows.length == 0) {
          res.json({ notes: [], error: "Invalid ID" })
        } else {
          if (fileType == "PDF") {
            getPDF(rows[0], req, res)
          } else
            res.json({ notes: rows, error: "OK" })
        }
      }
    });
  }
})

/*# Get notes, optionally specifying GET parameters where:
  # limit - indicating the maximum number of notes to get; if unspecified it gets all notes
  # order - specifies what order to sort the notes, based on creation time which can be either "asc" or "desc"; if unspecified, defaults to descending
  # start - specifies where in the sorted notes to begin getting notes; if unspecified, defaults to 1
*/

//GET /note?limit=10&start=1&order=asc

router.get('/', (req, res) => {
  var limit = parseInt(req.query.limit)
  var start = parseInt(req.query.start)
  var order = req.query.order
  
  if (limit > 2000000000 || limit < 0 || start > 2000000000 || start < 0)
    res.json({ notes: [],  error: "Invalid parameter in get request" })
  else {
    var orderAdd = " desc"
    if (order == "asc")
      orderAdd = " asc"
    
    var limitAdd = ""
    if (!isNaN(limit))
      limitAdd = " LIMIT " + limit
    
    var startAdd = ""
    if (!isNaN(start))
      startAdd = " WHERE ID >= " + start
    
    let query = "SELECT * FROM NOTES " + startAdd + " ORDER BY id" + orderAdd + limitAdd
    
    db.all(query, [], (err, rows) => {
      if (err) {
        throw err;
        res.json({
          notes: [],
          error: "Error accessing DB"
        })
      } else {
        res.json({ notes: rows, error: "OK" })
      }
    });
  }
})

// Delete a note with a given id
router.delete('/:id', (req, res) => {
  var now = new Date();
  
  let id = parseInt(req.params.id)
  
  if (isNaN(id) || id > 2000000000 || id < 0) {
    res.json({
      error: "Invalid note ID"
    })
  } else {
    db.run('DELETE FROM NOTES WHERE ID = (?)', [id], function(err) {
      if (err) {
        return console.log(err.message);
      }
      res.json({ error: "OK" })
    });
  }
})

router.get('*', (req, res) => {
  res.status(404).json({ code: -1, error: "OK" })
})

export default router
