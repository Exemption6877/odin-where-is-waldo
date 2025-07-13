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
    return await prisma.gameboard.create({
      data: {
        title: gameboard.title,
        image: gameboard.image,
        preview: gameboard.preview,
        author: gameboard.author,
        source: gameboard.source,
        img_filepath: gameboard.img_filepath,
        prev_filepath: gameboard.prev_filepath,
      },
    });
  } catch (err) {
    console.error(err);
    throw new Error("Database: Failed to add new gameboard.");
  }
}

async function addObjective(objective) {
  try {
    return await prisma.objective.create({
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
        img_filepath: gameboard.img_filepath,
        prev_filepath: gameboard.prev_filepath,
      },
    });
  } catch (err) {
    console.error(err);
    throw new Error("Database: Failed to update gameboard.");
  }
}

async function deleteGameboard(gameboardId) {
  try {
    await prisma.gameboard.delete({ where: { id: gameboardId } });
  } catch (err) {
    console.error(err);
    throw new Error("Database: Failed to delete gameboard.");
  }
}

async function deleteObjectives(gameboardId) {
  try {
    await prisma.objective.deleteMany({ where: { gameboardId: gameboardId } });
  } catch (err) {
    console.error(err);
    throw new Error("Database: Failed to delete objectives.");
  }
}

module.exports = {
  countGameboards,
  countObjectivesGameboard,
  addGameboard,
  addObjective,
  updateGameboard,
  deleteGameboard,
  deleteObjectives,
};
