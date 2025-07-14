const { Router } = require("express");

const gameboardController = require("../controllers/gameboardController");

const gameboardRouter = Router();
const objectiveRouter = require("./objectiveRouter");

gameboardRouter.use("/:gameboardId/objective", objectiveRouter);

gameboardRouter.get("/", gameboardController.getAllGameboards);
gameboardRouter.get("/:gameboardId", gameboardController.getGameboardById);

module.exports = gameboardRouter;
