const express = require("express");

require("dotenv").config();

const PORT = process.env.SERVER_PORT || 2000;

const app = express();

const adminRouter = require("./routers/adminRouter");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/admin", adminRouter);

app.listen(PORT, () => {
  console.log(`API is live at PORT: ${PORT}`);
});
