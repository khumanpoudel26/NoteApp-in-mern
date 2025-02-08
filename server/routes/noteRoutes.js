const express = require("express");
const{createNote,getNotes,deleteNote,setImportant,getImportant,updateNote,getNote} = require("../controllers/noteController.js");
const { isAuthenticated } = require("../middlewares/authUser.js");

const router = express.Router();

router.post("/createNote",isAuthenticated,createNote);
router.get("/getNotes",isAuthenticated,getNotes);
router.delete("/deleteNote/:_id",isAuthenticated,deleteNote);
router.get("/setImportant/:_id",isAuthenticated,setImportant);
router.get("/getImportant",isAuthenticated,getImportant);
router.patch("/updateNote/:_id",isAuthenticated,updateNote);
router.get("/getNote/:_id",isAuthenticated,getNote);
module.exports = router;