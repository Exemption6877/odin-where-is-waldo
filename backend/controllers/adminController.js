const db = require("../prisma/queries");
const supabase = require("../supabase/queries");
const path = require("path");

async function postUploadGameboard(req, res) {
  try {
    const { title, author, source } = req.body;

    const gameboard = req.files.gameboard[0];
    const preview = req.files.preview[0];
    const nextId = (await db.admin.countGameboards()) + 1;

    const gameboardPath =
      `gameboard_${nextId}` + path.extname(gameboard.originalname);
    const previewPath =
      `gameboard_${nextId}_preview` + path.extname(preview.originalname);

    await supabase.uploadFile(gameboardPath, gameboard.buffer, "gameboards");
    await supabase.uploadFile(previewPath, preview.buffer, "previews");

    const gameboardURL = await supabase.getPublicUrl(
      gameboardPath,
      "gameboards"
    );
    const previewURL = await supabase.getPublicUrl(previewPath, "previews");

    const gameboardData = {
      title: title,
      image: gameboardURL,
      preview: previewURL,
      author: author,
      source: source,
    };

    await db.admin.addGameboard(gameboardData);

    res.status(200).json({ message: "Files uploaded successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Could not add new gameboard." });
  }
}

module.exports = { postUploadGameboard };
