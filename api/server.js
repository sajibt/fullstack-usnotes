const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const noteRoutes = require("./routes/notes");
var cors = require("cors");
const userRoutes = require("./routes/user");

dotenv.config();
const app = express();

// middleware
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  // res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  console.log(req.path, req.method);
  next();
});

app.get("/", (req, res) => {
  res.send("I love you mow");
});

//route list
app.use("/notes", noteRoutes);
app.use("/users", userRoutes);

//Connect to databaase

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Conneted to db! Port: ", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
