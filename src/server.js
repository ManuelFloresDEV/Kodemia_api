const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const kodersRoutes = require("./router/koders.router");
const mentorsRoutes = require("./router/mentors.router");
const generationsRoutes = require("./router/generations.router");

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use("/koders", kodersRoutes);
app.use("/mentors", mentorsRoutes);
app.use("/generations", generationsRoutes);

app.get("/", (request, response) => {
  response.json({
    success: true,
    message: "KodersAPI",
  });
});

module.exports = app;
