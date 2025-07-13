const { Router } = require("express");
const multer = require("multer");
const path = require("path");
const db = require("../prisma/queries");

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const nextId = req.nextId;
    const filename = "gameboard_" + nextId;

    if (file.fieldname === "preview") {
      cb(null, filename + "_preview" + ext);
      return;
    }
    cb(null, filename + ext);
  },
});

const upload = multer({ storage });
const adminController = require("../controllers/adminController");
const adminRouter = Router();

async function gameboardNextId(req, res, next) {
  try {
    const counter = await db.admin.countGameboards();
    req.nextId = counter + 1;
    next();
  } catch (err) {
    next(err);
  }
}

adminRouter.post("/gameboard", adminController.postGameboard);
adminRouter.post(
  "/uploadtest",
  gameboardNextId,
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "preview", maxCount: 1 },
  ]),
  adminController.postUpload
);

module.exports = adminRouter;
