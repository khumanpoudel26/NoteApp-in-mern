const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    default: "Untitled"
  },
  paragraph: {
    type: String,
  },
  
  important: {
    type: Boolean,
    default: false
  }
  
}, { timestamps: true });

module.exports = mongoose.model("Note", noteSchema);
