const express = require("express");
const routes = require("./controllers");
const sequelize = require("./config/connection");
const path = require("path");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const multer = require("multer");

// Set up images
const DIR = "./public/uploads";

let storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, DIR);
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + path.extname(file.originalname));
  },
});

let upload = multer({ storage: storage });

module.exports = upload;

// Set up handlebars
const exphbs = require("express-handlebars");
const { callbackify } = require("util");
const { dirname } = require("path");
const hbs = exphbs.create({});

const app = express();
const PORT = process.env.PORT || 3001;

// set up handlebars
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

const sess = {
  secret: "Super secret secret",
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// turn on routes
app.use(routes);

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening."));
});
