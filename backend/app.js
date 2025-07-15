const express = require("express");
const expressSession = require("express-session");
const { PrismaSessionStore } = require("@quixo3/prisma-session-store");
const { PrismaClient } = require("@prisma/client");

require("dotenv").config();

const PORT = process.env.SERVER_PORT;
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN;
const SESSION_SECRET = process.env.SESSION_SECRET;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const cors = require("cors");
app.use(cors({ origin: FRONTEND_ORIGIN, credentials: true }));

app.use(
  expressSession({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000,
    },
    store: new PrismaSessionStore(new PrismaClient(), {
      checkPeriod: 2 * 60 * 1000,
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  })
);

const adminRouter = require("./routers/adminRouter");
app.use("/admin", adminRouter);

const gameboardRouter = require("./routers/gameboardRouter");
app.use("/gameboard", gameboardRouter);

app.listen(PORT, () => {
  console.log(`API is live at PORT: ${PORT}`);
});
