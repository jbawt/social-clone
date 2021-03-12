const router = require('express').Router();
const pool = require('../db');
const authorization = require('../middleware/authorization');

router.get("/", authorization, async (req, res) => {
  try {
    // res.json(req.user);
    const user = await pool.query("SELECT user_name, user_email FROM users WHERE user_id = $1", [req.user]);
    const posts = await pool.query("SELECT users.user_name as poster, posts.content as post, posts.post_id as id FROM posts JOIN users ON posts.user_id = users.user_id");

    const results = {
      user: user.rows[0],
      posts: posts.rows
    }
    res.json(results);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error");
  }
})

module.exports = router;