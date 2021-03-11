const router = require('express').Router();
const pool = require('../db');
const bcrypt = require('bcrypt');
const jwtGenerator = require('../utils/jwtGenerator');
const validInfo = require('../middleware/validInfo');
const authorization = require('../middleware/authorization');

router.post("/register", validInfo, async (req, res) => {
  try {
    // destructure req.body
    const { name, email, password } = req.body;

    // check if user exist(throw error if true)
    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [email]);

    if (user.rows.length !== 0) {
      return res.status(401).json("user already exists");
    }

    // bcrypt the user password
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    
    const bcryptPassword = await bcrypt.hash(password, salt);

    // enter the new user inside our database
    const newUser = await pool.query(
      "INSERT INTO users (user_name, user_email, user_password)  VALUES ($1, $2, $3) RETURNING *", [name, email, bcryptPassword]
    );

    // generating our jwt token
    const token = jwtGenerator(newUser.rows[0].user_id);
    res.json({ token })

  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error")
  }
})

router.post("/login", validInfo, async (req, res) => {
  try {
    
    const { email, password } = req.body;
    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [email]);
    
    if (user.rows.length === 0) {
      return res.status(401).json("Password or email is incorrect");
    }

    const validPassword = await bcrypt.compare(password, user.rows[0].user_password);

    if (!validPassword) {
      return res.status(401).json("password or email is incorrect");
    }

    const token = jwtGenerator(user.rows[0].user_id);
    res.json({ token })

  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error");
  }
})

router.get("/is-verify", authorization, async (req, res) => {
  try {
    res.json(true);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error");
  }
})

module.exports = router;