require("dotenv").config();

const express = require("express");
const noteRoute = require("./Routes/noteRoute");
const app = express();

app.use("/api/notes", noteRoute);

app.listen(process.env.PORT, () =>
  console.log("listening on port " + process.env.PORT)
);