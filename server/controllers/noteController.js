const usermodel = require("../models/user.js");
const notemodel = require("../models/note.js");

const createNote = async (req, res) => {
  try {
    const { title, paragraph } = req.body;
    const userId = req.user.id;

    const note = new notemodel({
      title,
      paragraph
    });

    await note.save();

    const user = await usermodel.findOne({ _id: userId });
    const setPost = await user.notes.push(note._id);
    await user.save();

    return res.status(201).json({
      success: true,
      message: "note has been created successfully !",
      data: note,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message
    });
  }
};

const getNotes = async (req, res) => {
  try {
    const userNotes = await usermodel.findOne({ _id: req.user.id }).populate("notes");

    return res.status(200).json({
      success: true,
      message: "get all your posts",
      data: userNotes.notes
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message
    });
  }
};

const deleteNote = async (req, res) => {
  try {
    const { _id } = req.params;

    const note = await notemodel.findOneAndDelete({ _id });

    if (!note) {
      return res.status(404).json({
        success: false,
        mesaage: "Invalid note id !"
      });
    }

    const user = await usermodel.findOne({ _id: req.user.id });
    const postIds = user.notes;

    const updatedNotes = postIds.filter(elm => elm != _id);

    const updatedUser = await usermodel.findOneAndUpdate({ _id: req.user.id }, { $set: { notes: updatedNotes } }, { new: true });

    return res.status(200).json({
      success: true,
      message: "Note deleted successfully",
      data: note,
      updatedNotes
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err
    });
  }
};

const setImportant = async (req, res) => {
  try {
    const { _id } = req.params;
    const user = await usermodel.findOne({ _id: req.user.id });

    if (user.importantNotes.indexOf(_id) < 0) {
      const updatedImportantNotes = await user.importantNotes.push(_id);
      
      const updatedNotes = await notemodel.findOneAndUpdate({_id},{
      $set:{important:true}},{new:true});
      
      await user.save();

      return res.status(200).json({
        success: true,
        message: "added to the important notes",
        data: user
      });
    }
    
    const important = user.importantNotes;
    const updatedImportantNotes = important.filter(elm => elm != _id);
    
    
    const updatedUser = await usermodel.findOneAndUpdate({_id:req.user.id},{
      $set:{importantNotes:updatedImportantNotes}},{new:true});
    const updatedNotes = await notemodel.findOneAndUpdate({_id},{
      $set:{important:false}},{new:true});
      
    return res.status(200).json({
      success: true,
      message: "removed from the important notes",
      updatedImportantNotes,
  
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message
    });
  }
};

getImportant = async (req,res)=>{
  try{
    
    const user = await usermodel.findOne({_id:req.user.id}).populate("importantNotes");
    
    
    
    return res.status(200).json({
      success: true,
      message: "get all your important notes",
      data: user.importantNotes,
      

    });
    
    
  } catch(err){
    return res.status(500).json({
      success: true,
      error: err.message
    });
  }
}

const updateNote = async (req,res)=>{
  try{
    const {_id} = req.params
    const {title,paragraph} = req.body
    
    const note = await notemodel.findOne({_id});
    
    if(!note){
      return res.status(403).json({
        success: false,
        message: "Invalid note Id !"
      });
    }
    const updatedNote = await notemodel.findOneAndUpdate({_id},{
      title,
      paragraph
    },{new:true});
    
    return res.status(200).json({
      success: true,
      message: "Note has been updated successfully !",
      data: updatedNote
    })
    
  } catch(err){
    return res.status(500).json({
      success: false,
      error: err.message
    })
  }
}

const getNote = async (req,res)=>{
  try{
    const {_id} = req.params
    
    const note = await notemodel.findOne({_id});
    
    if(!note){
      return res.status(404).json({
        success: false,
        message: "Invalid note Id !"
      });
    }
    
    return res.status(200).json({
      success: true,
      message: "Get your note info !",
      data: note
    })
    
    
    
  } catch(err){
    return res.status(500).json({
      success: false,
      error: err.message
    })
  }
}


module.exports = { createNote, getNotes, deleteNote, setImportant, getImportant,updateNote,getNote};
