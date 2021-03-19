const express = require('express');
const app = express();
const PORT = process.env.PORT || 3003;
const cors = require('cors');
const socket = require('socket.io');


app.use(express.json());
app.use(cors());

//routes

app.use("/auth", require("./routes/jwtAuth"));
app.use("/dashboard", require("./routes/dashBoard"));

const server = app.listen(PORT, () => console.log(`server listening on port ${PORT}`));

const io = socket(server);

io.on('connection', (socket) => {
  console.log('websocket connected: ', socket.id);

  socket.on("newMessage", (data) => {
    io.sockets.emit("newMessage", data);
  })
});

