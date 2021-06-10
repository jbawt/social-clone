const Express = require('express');
const BodyParser = require('body-parser');
const App = Express();
const PORT = 8080;
const cookieSession = require('cookie-session');

App.use(
  cookieSession({
    name: "session",
    keys: ["secretKey"],
  })
);

//db setup
const { Pool } = require('pg');
const dbParams = require('./lib/db.js');
const db = new Pool(dbParams);
db.connect(() => {
  console.log('connected to database');
});

// express set up
App.use(BodyParser.urlencoded({extended: false}));
App.use(BodyParser.json());
App.use(Express.static("public"));

// routes
const testRoute = require('./routes/testRoute');

App.use('/api/testRoute', testRoute(db));


App.listen(PORT, () => {
  console.log(`express is listening on port ${PORT}`);
});