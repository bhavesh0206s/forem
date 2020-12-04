const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require('express-session');
const passport = require('passport');
const connectDB = require("./config/db");
require('./services/googleAuth');

connectDB();

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'SECRET' 
}));

app.use(passport.initialize());
app.use(passport.session());

require("./routes/authRoutes")(app);
require("./routes/forumPost")(app);
require("./routes/forumTagRoute")(app);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`port running on ${PORT}`);
});
