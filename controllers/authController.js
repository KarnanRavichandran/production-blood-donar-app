const userModel = require("../models/userModel");
const bcrypt = require('bcryptjs');
const jwt  = require('jsonwebtoken')


const registerController = async (req,res,next)=>{
 try {
    const existingUser = await userModel.findOne({ email: req.body.email });
    if(existingUser){
        return res.status(400).json({ success: false, message: "Email already in use." });
    }
      const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashedPassword;
    

    const user = await userModel(req.body)
     await user.save();
     return res.status(200).json({ success: true, message: "New User Created", user });

 } catch (error) {
     console.log(error);
     return res.status(500).json({ success: false, message: "Internal server error" });
 }
}

const loginController = async (req, res, next) => {
    try {
        // Retrieve user from database by email
        const user = await userModel.findOne({ email: req.body.email });

        // Check if user exists
        if (!user) {
            return res.status(400).json({ success: false, message: "User not found" });
        }
        // 
        if(user.role !== req.body.role){
            return res.status(500).json({ success: false, message: "Role doesnot match" });
        }

        // Verify password
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            return res.status(400).json({ success: false, message: "Incorrect password" });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Return success response with token and user
        return res.status(200).json({ success: true, message: "Successfully logged in", token, user });
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};



const currentUserController = async (req, res) => {
    try {
      const user = await userModel.findOne({ _id: req.body.userId });
      return res.status(200).send({
        success: true,
        message: "User Fetched Successfully",
        user,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        success: false,
        message: "unable to get current user",
        error,
      });
    }
  };




  
  module.exports = { registerController, loginController, currentUserController };
module.exports={
    registerController,
    loginController,
    currentUserController
}