const express = require("express");
const session = require("express-session");

require("dotenv").config();

const PORT = process.env.SERVER_PORT || 2000;
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || "http://localhost:5173";

const app = express();

const adminRouter = require("./routers/adminRouter");
const gameboardRouter = require("./routers/gameboardRouter");

const cors = require("cors");
app.use(cors({ origin: FRONTEND_ORIGIN, credentials: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "game_is_game",
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      secure: false,
      sameSite: "none",
    },
  })
);

app.use("/gameboard", gameboardRouter);
app.use("/admin", adminRouter);

app.listen(PORT, () => {
  console.log(`API is live at PORT: ${PORT}`);
});
