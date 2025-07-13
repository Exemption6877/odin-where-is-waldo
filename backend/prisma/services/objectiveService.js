const prisma = require("../prisma");

async function getAllByGameboardId(gameboardId) {
  try {
    return await prisma.objective.findMany({
      where: { gameboardId: gameboardId },
    });
  } catch (err) {
    console.error(err);
    throw new Error("Database: Failed to fetch gameboard.");
  }
}

module.exports = { getAllByGameboardId };
