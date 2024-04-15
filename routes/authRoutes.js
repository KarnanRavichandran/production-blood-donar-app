const express = require('express');
const { registerController, loginController, currentUserController } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

const authrouter = express.Router();

authrouter.post('/register',registerController)
authrouter.post('/login',loginController)

//middleware 
authrouter.get('/current-user', authMiddleware, currentUserController);


module.exports = authrouter;