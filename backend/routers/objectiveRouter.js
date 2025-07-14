const { Router } = require("express");

const objectiveController = require("../controllers/objectiveController");

const objectiveRouter = Router({ mergeParams: true });

objectiveRouter.get("/random", objectiveController.getRandomObjectives);
objectiveRouter.post(
  "/check/:objectiveId",
  objectiveController.postCheckObjective
);

module.exports = objectiveRouter;
