const prisma = require("../prisma");

async function addScore(score) {
  try {
    return await prisma.score.create({
      time: score.time,
      username: score.username,
      gameboardId: score.gameboardId,
    });
  } catch (err) {
    console.error(err);
    throw new Error("Database: Failed to add score.");
  }
}

async function getAllByGameboard(gameboardId) {
  try {
    return await prisma.score.findMany({ where: { gameboardId: gameboardId } });
  } catch (err) {
    console.error(err);
    throw new Error("Database: Failed to fetch scores.");
  }
}

module.exports = { addScore, getAllByGameboard };
