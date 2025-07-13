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

async function postUpload(req, res) {
  try {
    const image = req.files.image[0];
    const preview = req.files.preview[0];

    console.log(image, preview);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
}

module.exports = { postGameboard, postUpload };
