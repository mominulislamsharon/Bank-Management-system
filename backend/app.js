const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");

const app = express();

app.use(helmet());

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  }),
);

const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 HOUR
  max: 10000,
  message: "Too many request from this IP, please try again in an hour!",
  standardHeaders: true,
  legacyHeader: false,
});

app.use("/api", limiter);

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json({ limit: "10kb" }));

app.use((req, res, next) => {
  mongoSanitize.sanitize(req.body);
  mongoSanitize.sanitize(req.params);

  const queryCopy = { ...req.query };
  mongoSanitize.sanitize(queryCopy);

  req.querySanitized = queryCopy;
  next();
});

app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Just for testing",
  });
});

module.exports = app;
