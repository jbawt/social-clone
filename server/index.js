const express = require('express');
const app = express();
const PORT = 3003;
const cors = require('cors');

app.use(express.json());
app.use(cors());

//routes

app.use("/auth", require("./routes/jwtAuth"));
app.use("/dashboard", require("./routes/dashBoard"));

app.listen(PORT, () => console.log(`server listening on port ${PORT}`));