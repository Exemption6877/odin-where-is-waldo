const { Router } = require("express");

const gameboardController = require("../controllers/gameboardController");

const gameboardRouter = Router();
const objectiveRouter = require("./objectiveRouter");
const scoreRouter = require("./scoreRouter");

gameboardRouter.use("/:gameboardId/objective", objectiveRouter);
gameboardRouter.use("/:gameboardId/score", scoreRouter);

gameboardRouter.get("/", gameboardController.getAllGameboards);
gameboardRouter.get("/:gameboardId", gameboardController.getGameboardById);

module.exports = gameboardRouter;
