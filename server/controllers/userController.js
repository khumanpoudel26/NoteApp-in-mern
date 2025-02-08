const usermodel = require("../models/user.js");
const notemodel = require("../models/note.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const isAuthenticated = require("../middlewares/authUser.js");
const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userExist = await usermodel.findOne({ email });

    if (userExist) {
      return res.status(403).json({
        success: false,
        message: "*Email already exists!",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new usermodel({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return res.status(201).json({
      success: true,
      message: "Registered Successfully!",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await usermodel.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "*Invalid email or password",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "*Invalid email or password",
      });
    }

    const token = jwt.sign(
      { id: user._id, name: user.name, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "90d" }
    );

    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 90 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "Logged in successfully!",
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

const logoutUser = (req,res)=>{
  try{
    const user = req.cookies.auth_token;
    res.cookie("auth_token","");
    res.status(200).json({
      success: true,
      message: "Logged Out successfully !"
    });
    
    
  } catch(err){
    return res.status(500).json({
      success: false,
      error : err.message
    });
  }
}



module.exports = { createUser, loginUser,logoutUser};
