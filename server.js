const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const bodyParser = require('body-parser');
const routes = require('./router/index');
const connection = require('./database/db');
var session = require('express-session');

let port = process.env.PORT;
if (port == null || port == "") {
  port = 8800;
}

let activeUsers = [];

app.use(session({
  secret: 'chitChat',
  resave: true,
  saveUninitialized: false
}))
console.log('modiji')
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());


io.of('/chat').on('connection', function (socket) {
  console.clear();
  console.info('socket query', socket.handshake.query);
  let userId = socket.handshake.query.userId;
  // socket.join('')
  activeUsers[userId] = socket;
  // console.log(activeUsers);
  console.log('a user connected');
  socket.on('disconnect', function (socket) {
    console.log('a user disconnected');
  });
  socket.on('msg', ({ msg, to }) => {
    console.log(msg, 'to', to);

    if (activeUsers[to]) {
      activeUsers[to].emit('chat', msg);
    }
  });

});


connection();

http.listen(port, () => {
  console.clear();
  console.log(`application is running on port ${port}`);

})

app.use('/', routes);






// long : 77.9973939
// lat  : 27.2120982