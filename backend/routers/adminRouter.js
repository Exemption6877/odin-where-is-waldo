const { Router } = require("express");
const multer = require("multer");

const upload = multer({ storage: multer.memoryStorage() });
const adminController = require("../controllers/adminController");
const adminRouter = Router();

adminRouter.post(
  "/gameboard",

  upload.fields([
    { name: "gameboard", maxCount: 1 },
    { name: "preview", maxCount: 1 },
  ]),
  adminController.postUploadGameboard
);

adminRouter.post(
  "/gameboard/:gameboardId/objective",
  upload.single("objective"),
  adminController.postUploadObjective
);

adminRouter.put("/gameboard/:gameboardId", adminController.putGameboard);
adminRouter.delete("/gameboard/:gameboardId", adminController.deleteGameboard);

// put gameboard for changes

module.exports = adminRouter;
