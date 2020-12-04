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

if(process.env.NODE_ENV === 'production'){
  // Express will serve up production asserts
  // like our main.js filr and main.css
  app.use(express.static('client/build'));

  // Express will serve up index.html file
  // if it doesn't recognize the route
  const path = require('path');
  app.get('*', (req, res)=>{
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`port running on ${PORT}`);
});
