const db = require("../prisma/queries");

async function postScore(req, res) {
  try {
    const gameboardId = Number(req.params.gameboardId);
    const { username, time } = req.body;

    const scoreData = {
      time: time,
      username: username,
      gameboardId: gameboardId,
    };

    const result = await db.score.addScore(scoreData);

    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not upload score." });
  }
}

async function getAllScores(req, res) {
  try {
    const gameboardId = Number(req.params.gameboardId);

    const result = await db.score.getAllByGameboard(gameboardId);
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not fetch scores." });
  }
}

module.exports = { postScore, getAllScores };
