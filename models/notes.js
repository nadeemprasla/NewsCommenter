const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const NotesSchema = new Schema({
    title: String,
    body: String
})

let Notes = mongoose.model("Notes", NotesSchema)

module.exports = Notes;