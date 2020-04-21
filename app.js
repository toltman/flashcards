const express = require("express");
const cookieParser = require("cookie-parser");
const mainRoutes = require("./routes");
const cardRoutes = require("./routes/cards");

const port = 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/static", express.static("public"));
app.set("view engine", "pug");

app.use(mainRoutes);
app.use("/cards", cardRoutes);

// Set 404 error
app.use((req, res, next) => {
  const err = new Error("Not found");
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  res.locals.error = err;
  res.status(err.status);
  res.render("error", err);
});

app.listen(port, () => {
  console.log(`The application is running on localhost:${port}`);
});
