async function getPreviews(req, res) {
  try {
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not fetch previews." });
  }
}

module.exports = { getPreviews };
