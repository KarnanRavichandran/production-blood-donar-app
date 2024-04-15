const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const { getAdminController } = require('../controllers/adminController');
const adminMiddleware = require('../middleware/adminMiddleware');
const {
    getDonarsListController,
    getHospitalListController,
    getOrgListController,
    deleteDonarController,
  } = require("../controllers/adminController");



const adminRouter = express.Router();

adminRouter.get(
    "/donar-list",
    authMiddleware,
    adminMiddleware,
    getDonarsListController
  );

  adminRouter.get(
    "/hospital-list",
    authMiddleware,
    adminMiddleware,
    getHospitalListController
  );
  //GET || ORG LIST
  adminRouter.get("/org-list", authMiddleware, adminMiddleware, getOrgListController);
  // ==========================
  
  // DELETE DONAR || GET
  adminRouter.delete(
    "/delete-donar/:id",
    authMiddleware,
    adminMiddleware,
    deleteDonarController
  );


module.exports = adminRouter;