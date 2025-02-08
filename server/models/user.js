const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
  name:{
    type: String
    
  },
  
  email:{
    type: String,
    unique: true
  },
  
  password:{
    type: String
  },
  
  notes:[{
     type: mongoose.Types.ObjectId, 
     ref: 'Note'
  }],
  
  importantNotes:[{
    type: mongoose.Types.ObjectId,
    ref: 'Note'
  }]
  
  
});

module.exports = mongoose.model("User",userSchema);