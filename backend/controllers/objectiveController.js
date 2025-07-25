const { intervalToDuration } = require("date-fns");
const db = require("../prisma/queries");

async function getRandomObjectives(req, res) {
  try {
    const gameboardId = Number(req.params.gameboardId);
    let allObjectives = await db.objective.getAllByGameboardId(gameboardId);

    const randomObjectives = [];
    const usedIndex = new Set();

    while (randomObjectives.length < 3) {
      const randomIndex = Math.floor(Math.random() * allObjectives.length);

      if (!usedIndex.has(randomIndex)) {
        randomObjectives.push({ ...allObjectives[randomIndex], found: false });
        usedIndex.add(randomIndex);
      }
    }

    req.session.objectives = randomObjectives;
    req.session.timer = { start: new Date(), finish: null };

    res.status(200).json(randomObjectives);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not fetch objectives." });
  }
}

async function postCheckObjective(req, res) {
  try {
    const { userX, userY } = req.body;
    const objectiveId = Number(req.params.objectiveId);
    const currentObjectives = req.session.objectives;
    let isHit = false;

    if (!currentObjectives) {
      return res
        .status(404)
        .json({ error: "You do not have objectives currently." });
    }

    const isCurrentObjective = currentObjectives.find(
      (obj) => obj.id === objectiveId
    );

    if (!isCurrentObjective) {
      return res
        .status(404)
        .json({ status: "You do not have this objective." });
    }

    for (const objective of currentObjectives) {
      if (objective.found) {
        continue;
      }

      if (
        objective.id === objectiveId &&
        userX >= objective.topLeftX &&
        userY >= objective.topLeftY &&
        userX <= objective.bottomRightX &&
        userY <= objective.bottomRightY
      ) {
        objective.found = true;
        isHit = true;
        break;
      }
    }

    const allFound = currentObjectives.every((obj) => obj.found);

    if (allFound) {
      const finishTime = new Date();
      req.session.completed = true;

      const time = finishTime - new Date(req.session.timer.start);
      return res.status(200).json({ status: "Finished", time: time });
    }

    res.status(200).json({ status: isHit ? "found" : "not found" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not confirm with the server." });
  }
}

module.exports = { getRandomObjectives, postCheckObjective };
