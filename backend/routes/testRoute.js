const express = require('express');
const router = express.Router();

module.exports = (db) => {

  router.get('/', (req, res) => {
    db.query(`SELECT * FROM users;`)
      .then(data => {
        res.send(data.rows);
      })
      .catch(err => console.log(err))
  });

  return router;
}