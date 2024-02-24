require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const noteRoute = require("./Routes/noteRoute");
const userRoute = require("./Routes/userRoute");
const cors = require("cors");
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Authorization", "Content-Type"],
  })
);

app.use(express.json());
app.use("/api/user/", userRoute);
app.use("/api/notes", noteRoute);

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    app.listen(process.env.PORT, () =>
      console.log("Connected to DB & listening on port " + process.env.PORT)
    );
  })
  .catch((err) => console.log("There was an error connecting to DB " + err));
