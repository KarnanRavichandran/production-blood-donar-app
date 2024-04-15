const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const { bloodGroupDetailsContoller } = require('../controllers/anlysticsController');



const anlysticsRouter = express.Router();

anlysticsRouter.post('/bloodgroup-data',bloodGroupDetailsContoller)



module.exports = anlysticsRouter;