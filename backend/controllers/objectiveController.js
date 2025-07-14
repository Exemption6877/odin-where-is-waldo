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
        randomObjectives.push(allObjectives[randomIndex]);
        usedIndex.add(randomIndex);
      }
    }

    res.status(200).json(randomObjectives);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not fetch objectives." });
  }
}

module.exports = { getRandomObjectives };
