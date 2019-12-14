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
    time: {
        type: String,
    },
    image: {
        type:String,
    },
    note: {
        type: Schema.Types.ObjectId,
        ref: "Notes"
    },
    saved: Boolean,
    hearturl: String
});

var Articles = mongoose.model("Articles", ArticleSchema);

module.exports = Articles