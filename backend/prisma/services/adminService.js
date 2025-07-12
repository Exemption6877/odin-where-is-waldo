const prisma = require("../prisma");

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

module.exports = { addGameboard };
