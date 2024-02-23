require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const noteRoute = require("./Routes/noteRoute");
const app = express();

app.use(express.json());
app.use("/api/notes", noteRoute);

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    app.listen(process.env.PORT, () =>
      console.log("Connected to DB & listening on port " + process.env.PORT)
    );
  })
  .catch((err) => console.log("There was an error connecting to DB " + err));
