const { Router } = require("express");
const multer = require("multer");

const upload = multer({ storage: multer.memoryStorage() });
const adminController = require("../controllers/adminController");
const adminRouter = Router();

adminRouter.post("/gameboard", adminController.postGameboard);
adminRouter.post(
  "/uploadtest",

  upload.fields([
    { name: "gameboard", maxCount: 1 },
    { name: "preview", maxCount: 1 },
  ]),
  adminController.postUpload
);

module.exports = adminRouter;
