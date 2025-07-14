function verifyCompletion(req, res, next) {
  const completed = req.session.completed;
  if (!completed) {
    return res.status(403).json({ message: "The game is not completed yet." });
  }
  next();
}

module.exports = verifyCompletion;
