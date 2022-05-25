var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
const handleErrors = require("./service/handleErrors");

var indexRouter = require("./routes/index");
var postsRouter = require("./routes/posts");

var app = express();

require("./connections");

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use(postsRouter);

app.use((req, res, next) => {
  res.status(404).send({
    status: "false",
    message: "無此網站路由",
  });
});

app.use((err, req, res, next) => {
  handleErrors(res, err);
});

module.exports = app;
