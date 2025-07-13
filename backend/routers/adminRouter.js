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

// adminRouter.post("/objective", upload.single("objective"));

module.exports = adminRouter;
