const express = require("express");

require("dotenv").config();

const PORT = process.env.SERVER_PORT || 2000;

const app = express();

app.listen(PORT, () => {
  console.log(`API is live at PORT: ${PORT}`);
});
