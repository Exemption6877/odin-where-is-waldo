const db = require("../prisma/queries");

async function postGameboard(req, res) {
  try {
    const parsingData = {
      title: "test",
      image: "testURL",
      preview: "testURL",
      author: "someguy",
      source: "somewhere",
    };

    await db.admin.addGameboard(parsingData);
    res.status(200).json({ message: "Gameboard added successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not add new gameboard." });
  }
}

module.exports = { postGameboard };
