const router = require('express').Router();
const pool = require('../db');
const authorization = require('../middleware/authorization');

router.get("/", authorization, async (req, res) => {
  try {
    // res.json(req.user);
    const user = await pool.query("SELECT user_name, user_email FROM users WHERE user_id = $1", [req.user]);
    const posts = await pool.query("SELECT users.user_name as poster, posts.content as post, posts.post_id as id, posts.created_at as created_at FROM posts JOIN users ON posts.user_id = users.user_id");
    const users = await pool.query("SELECT * FROM users");
    const messages = await pool.query("SELECT * FROM messages");

    const results = {
      user: user.rows[0],
      posts: posts.rows,
      users: users.rows,
      messages: messages.rows
    }
    res.json(results);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error");
  }
});

router.post("/post", authorization, async(req, res) => {
  try {
    const content = req.body.content[0];
    const date = req.body.date;
    const results = await pool.query("INSERT INTO posts (user_id, content, created_at) VALUES ($1, $2, $3) RETURNING post_id", [req.user, content, date]);
    const updatePage = await pool.query("SELECT users.user_name as poster, posts.content as post, posts.post_id as id, posts.created_at as created_at FROM posts JOIN users ON posts.user_id = users.user_id WHERE posts.post_id = $1", [results.rows[0].post_id]);

    res.json(updatePage.rows[0]);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error");
  }
  
})

router.post('/message', authorization, async(req, res) => {
  try {
    const { message, created_at, recepient_id } = req.body;
    const results = await pool.query("INSERT INTO messages (sender_id, recepient_id, message, created_at) VALUES ($1, $2, $3, $4) RETURNING *", [req.user, recepient_id, message, created_at]);
    
    res.json(results.rows[0]);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error");
  }
})

module.exports = router;