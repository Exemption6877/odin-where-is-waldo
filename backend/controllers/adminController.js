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
      title,
      author,
      source,
      image: gameboardURL,
      preview: previewURL,
      img_filepath: gameboardPath,
      prev_filepath: previewPath,
    };

    const result = await db.admin.addGameboard(gameboardData);

    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Could not add new gameboard." });
  }
}

async function putGameboard(req, res) {
  try {
    const {
      title,
      img_filepath,
      prev_filepath,
      author,
      source,
      image,
      preview,
    } = req.body;
    const gameboardId = Number(req.params.gameboardId);
    const prevData = await db.gameboard.getById(gameboardId);

    if (!prevData) {
      return res.status(404).json({ message: "Gameboard not found." });
    }

    console.log(prevData);

    const updatedData = {
      id: gameboardId,
      title: title || prevData.title,
      author: author || prevData.author,
      source: source || prevData.source,
      image: image || prevData.image,
      preview: preview || prevData.preview,
      img_filepath: img_filepath || prevData.filepath,
      prev_filepath: prev_filepath || prevData.prev_filepath,
    };

    const result = await db.admin.updateGameboard(updatedData);

    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Could not change gameboard." });
  }
}

async function deleteGameboard(req, res) {
  try {
    const gameboardId = Number(req.params.gameboardId);
    const prevData = await db.gameboard.getById(gameboardId);

    if (!prevData) {
      return res.status(404).json({ message: "Gameboard not found." });
    }

    const prevObjectives = await db.objective.getAllByGameboardId(gameboardId);
    const prevObjTitles = prevObjectives.map((objective) => objective.title);

    await db.admin.deleteObjectives(gameboardId);
    await db.admin.deleteGameboard(gameboardId);
    await supabase.deleteFile(prevObjTitles, "objectives");
    await supabase.deleteFile(prevData.img_filepath, "gameboards");
    await supabase.deleteFile(prevData.prev_filepath, "previews");

    res.status(200).json({ message: "Gameboard deleted successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Could not delete gameboard." });
  }
}

async function postUploadObjective(req, res) {
  try {
    // JS sucks
    const topLeftX = Number(req.body.topLeftX);
    const topLeftY = Number(req.body.topLeftY);
    const bottomRightX = Number(req.body.bottomRightX);
    const bottomRightY = Number(req.body.bottomRightY);

    const gameboardId = Number(req.params.gameboardId);
    const image = req.file;

    const nextObjectiveId =
      (await db.admin.countObjectivesGameboard(gameboardId)) + 1;

    const imagePath =
      `obj_${gameboardId}_${nextObjectiveId}` +
      path.extname(image.originalname);

    await supabase.uploadFile(imagePath, image.buffer, "objectives");
    const imageURL = await supabase.getPublicUrl(imagePath, "objectives");

    const objectiveData = {
      title: imagePath,
      topLeftX,
      topLeftY,
      bottomRightX,
      bottomRightY,
      gameboardId,
      image: imageURL,
    };

    const result = await db.admin.addObjective(objectiveData);

    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Could not add new objective." });
  }
}

module.exports = {
  postUploadGameboard,
  postUploadObjective,
  putGameboard,
  deleteGameboard,
};
