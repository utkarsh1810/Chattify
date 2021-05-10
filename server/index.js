const express = require('express');
const socketio = require('socket.io');
const http = require('http');
// const cors = require('cors');

const { addUser, removeUser, getUser, getUserInRoom } = require('./users.js');

const port =  process.env.PORT || 5000;
const router = require('./router');

const app = express();
const server = http.createServer(app);
const options = {
  cors: {
    origin: '*',
  },
};
const io = socketio(server, options);

io.on('connection', (socket) => {
  console.log("We have a new connection. ");

  socket.on('join', ({name, room}, callback) => {
    const{err, user} = addUser({id: socket.id, name, room});
    if(err) callback(err);

    socket.join(user.room);

    socket.emit('message', {user: "admin", text: `${user.name}, welcome to the room ${user.room}`});
    socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });

    io.to(user.room).emit('roomData', {room: user.room, users: getUserInRoom(user.room)})
    callback();
  });

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);
    console.log(user);

    io.to(user.room).emit('message', {user: user.name, text: message});
    callback();

  })

  socket.on('disconnect', ()=> {
    console.log("User had left.");
    const user = removeUser(socket.id);
    if(user) {
      io.to(user.room).emit('message', {user: 'admin', text: `${user.name} has left. `});
      io.to(user.room).emit('roomData', { room: user.room, users: getUserInRoom(user.room)});
    }
  })
});

// app.use(cors());
app.use(router);
server.listen(port, () => console.log(`Server is listening at ${port}`));