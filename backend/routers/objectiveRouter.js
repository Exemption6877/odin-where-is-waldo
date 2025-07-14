const { Router } = require("express");

const objectiveController = require("../controllers/objectiveController");

const objectiveRouter = Router({ mergeParams: true });

objectiveRouter.get("/random", objectiveController.getRandomObjectives);

module.exports = objectiveRouter;
