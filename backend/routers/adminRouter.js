const { Router } = require("express");

const adminController = require("../controllers/adminController");

const adminRouter = Router();

adminRouter.post("/gameboard", adminController.postGameboard);

module.exports = adminRouter;
