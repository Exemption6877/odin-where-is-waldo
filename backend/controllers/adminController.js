const db = require("../prisma/queries");
const supabase = require("../supabase/queries");
const path = require("path");

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
    // const { title, author, source } = req.body;

    const gameboard = req.files.gameboard[0];
    const preview = req.files.preview[0];

    const counter = await db.admin.countGameboards();
    const nextId = counter + 1;

    const gameboardPath =
      `gameboard_${nextId}` + path.extname(gameboard.originalname);
    const previewPath =
      `gameboard_${nextId}_preview` + path.extname(preview.originalname);

    const gameboardSupabase = await supabase.uploadFile(
      gameboardPath,
      gameboard.buffer,
      "gameboards"
    );
    const previewSupabase = await supabase.uploadFile(
      previewPath,
      preview.buffer,
      "previews"
    );

    res.status(200).json({ message: "Files uploaded successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
}

module.exports = { postGameboard, postUpload };
