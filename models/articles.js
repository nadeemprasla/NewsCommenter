const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    link: {
        type: String,
        required: true
    },
    note: {
        type: Schema.Types.ObjectId,
        ref: "Notes"
    }
});

var Articles = mongoose.model("Articles", ArticleSchema);

module.exports = Articles