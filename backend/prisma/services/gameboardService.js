const prisma = require("../prisma");

async function getAll() {
  try {
    return await prisma.gameboard.findMany();
  } catch (err) {
    console.error(err);
    throw new Error("Database: Failed to fetch gameboards.");
  }
}

async function getById(gameboardId) {
  try {
    return await prisma.gameboard.findUnique({ where: { id: gameboardId } });
  } catch (err) {
    console.error(err);
    throw new Error("Database: Failed to fetch gameboard.");
  }
}

module.exports = { getAll, getById };
