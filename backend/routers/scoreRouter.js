const { Router } = require("express");
const scoreController = require("../controllers/scoreController");
const verifyCompletion = require("../middleware/verifyCompletion");

const scoreRouter = Router();

scoreRouter.get("/", scoreController.getAllScores);
scoreRouter.post("/", verifyCompletion, scoreController.postScore);

module.exports = scoreRouter;
