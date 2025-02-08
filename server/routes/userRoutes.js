const express = require("express");
const { createUser, loginUser,logoutUser } = require("../controllers/userController.js");
const { isAuthenticated } = require("../middlewares/authUser.js");

const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/isAuthenticated", isAuthenticated,(req,res)=>{
      return res.status(200).json({
      success: true,
      mmessage: "Authorized user !"
    });
});


router.get("/logout",logoutUser);

module.exports = router;
