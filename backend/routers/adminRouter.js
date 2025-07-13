const { Router } = require("express");
const multer = require("multer");

const upload = multer({ storage: multer.memoryStorage() });
const adminController = require("../controllers/adminController");
const adminRouter = Router();

const checkAdmin = require("../middleware/checkAdmin");

adminRouter.post(
  "/gameboard",
  checkAdmin,
  upload.fields([
    { name: "gameboard", maxCount: 1 },
    { name: "preview", maxCount: 1 },
  ]),
  adminController.postUploadGameboard
);

adminRouter.post(
  "/gameboard/:gameboardId/objective",
  checkAdmin,
  upload.single("objective"),
  adminController.postUploadObjective
);

adminRouter.put(
  "/gameboard/:gameboardId",
  checkAdmin,
  adminController.putGameboard
);
adminRouter.delete(
  "/gameboard/:gameboardId",
  checkAdmin,
  adminController.deleteGameboard
);

// DELETE, PUT for objectives
adminRouter.put(
  "/gameboard/:gameboardId/objective/:objectiveId",
  adminController.putObjective
);
adminRouter.delete(
  "/objective/:objectiveId",
  checkAdmin,
  adminController.deleteObjective
);

// put gameboard for changes

module.exports = adminRouter;
