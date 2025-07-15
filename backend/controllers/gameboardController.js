const db = require("../prisma/queries");

async function getAllGameboards(req, res) {
  try {
    const data = await db.gameboard.getAll();
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not fetch previews." });
  }
}

async function getGameboardById(req, res) {
  try {
    const gameboardId = Number(req.params.gameboardId);
    const data = await db.gameboard.getById(gameboardId);

    if (!data) {
      return res.status(404).json({ message: "Gameboard not found." });
    }

    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not fetch previews." });
  }
}

module.exports = { getAllGameboards, getGameboardById };
