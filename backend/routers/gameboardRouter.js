const { Router } = require("express");

const gameboardController = require("../controllers/gameboardController");

const gameboardRouter = Router();

gameboardRouter.get("/", gameboardController.getAllGameboards);
gameboardRouter.get("/:gameboardId", gameboardController.getGameboardById);

module.exports = gameboardRouter;
