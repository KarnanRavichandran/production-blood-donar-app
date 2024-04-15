const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  newInventory,
  getInventoryController,
  getInventoryHospitalController,
  getDonars,
  getHospitalController,
  getRecentInventoryController,
  getOrgnaisationController,
  getOrgnaisationForHospitalController,
} = require("../controllers/inventoryController");

const inventoryRouter = express.Router();

inventoryRouter.post("/create-inventory", authMiddleware, newInventory);
inventoryRouter.get("/get-inventory", authMiddleware, getInventoryController);
inventoryRouter.get(
  "/get-recent-inventory",
  authMiddleware,
  getRecentInventoryController
);

inventoryRouter.post(
  "/get-inventory-hospital",
  authMiddleware,
  getInventoryHospitalController
);

inventoryRouter.get("/get-donars", authMiddleware, getDonars);
inventoryRouter.get("/get-hospitals", authMiddleware, getHospitalController);
inventoryRouter.get(
  "/get-orgnaisation",
  authMiddleware,
  getOrgnaisationController
);

inventoryRouter.get(
  "/get-orgnaisation-for-hospital",
  authMiddleware,
  getOrgnaisationForHospitalController
);

//middleware

module.exports = inventoryRouter;
