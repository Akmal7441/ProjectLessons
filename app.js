const express = require("express");
const app = express();
const path = require("path");
const homeRouter = require("./routes/home");
const restRout = require("./routes/restFull");

// Dotenv
require("dotenv").config();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
/* app.use(helmet()) */
app.use("/", homeRouter);
app.use("/api/lessons/", restRout);
app.use(express.static(path.join(__dirname, "public")));

// Pug
app.set("view engine", "pug");

const port = normalizePort(process.env.PORT || 8000);

app.listen(port, () => {
  console.log("app listen boldi", +port);
});

function normalizePort(val) {
  const num = parseInt(val);
  if (isNaN(num)) {
    return val;
  }

  if (num >= 0) {
    return num;
  }

  return false;
}
