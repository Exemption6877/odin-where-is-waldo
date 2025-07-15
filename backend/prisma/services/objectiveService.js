const prisma = require("../prisma");

async function getAllByGameboardId(gameboardId) {
  try {
    return await prisma.objective.findMany({
      where: { gameboardId: gameboardId },
    });
  } catch (err) {
    console.error(err);
    throw new Error("Database: Failed to fetch objectives.");
  }
}

async function getById(objectiveId) {
  try {
    return await prisma.objective.findUnique({ where: { id: objectiveId } });
  } catch (err) {
    console.error(err);
    throw new Error("Database: Failed to fetch objective.");
  }
}

module.exports = { getAllByGameboardId, getById };
