const express = require("express");
const { PrismaSessionStore } = require("@quixo3/prisma-session-store");
const { PrismaClient } = require("@prisma/client");

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
  expressSession({
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000,
    },
    secret: "a santa at nasa",
    resave: true,
    saveUninitialized: true,
    store: new PrismaSessionStore(new PrismaClient(), {
      checkPeriod: 2 * 60 * 1000,
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  })
);

app.use("/gameboard", gameboardRouter);
app.use("/admin", adminRouter);

app.listen(PORT, () => {
  console.log(`API is live at PORT: ${PORT}`);
});
