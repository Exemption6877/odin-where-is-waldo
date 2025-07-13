const prisma = require("../prisma");

async function countGameboards() {
  try {
    return await prisma.gameboard.count();
  } catch (err) {
    console.error(err);
    throw new Error("Database: Failed to fetch gameboards.");
  }
}

async function countObjectivesGameboard(gameboardId) {
  try {
    return await prisma.objective.count({
      where: { gameboardId },
    });
  } catch (err) {
    console.error(err);
    throw new Error("Database: Failed to fetch objectives");
  }
}

async function addGameboard(gameboard) {
  try {
    await prisma.gameboard.create({
      data: {
        title: gameboard.title,
        image: gameboard.image,
        preview: gameboard.preview,
        author: gameboard.author,
        source: gameboard.source,
      },
    });
  } catch (err) {
    console.error(err);
    throw new Error("Database: Failed to add new gameboard.");
  }
}

async function addObjective(objective) {
  try {
    await prisma.objective.create({
      data: {
        title: objective.title,
        image: objective.image,
        topLeftX: objective.topLeftX,
        topLeftY: objective.topLeftY,
        bottomRightX: objective.bottomRightX,
        bottomRightY: objective.bottomRightY,
        gameboardId: objective.gameboardId,
      },
    });
  } catch (err) {
    console.error(err);
    throw new Error("Database: Failed to add new objective.");
  }
}

async function updateGameboard(gameboard) {
  try {
    return await prisma.gameboard.update({
      where: { id: gameboard.id },
      data: {
        title: gameboard.title,
        image: gameboard.image,
        preview: gameboard.preview,
        author: gameboard.author,
        source: gameboard.source,
      },
    });
  } catch (err) {
    console.error(err);
    throw new Error("Database: Failed to update gameboard.");
  }
}

module.exports = {
  countGameboards,
  countObjectivesGameboard,
  addGameboard,
  addObjective,
  updateGameboard,
};
