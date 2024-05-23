const express = require('express');
const socket = require('socket.io');
const session = require('express-session');
const http = require('http');
const fs = require('fs');
const app = express();
const router = require('./routes/Mainroute');
const bodyParser = require('body-parser');
const PORT = 8000;
const SECRET_KEY = "YHS";

app.use(session({
  secret: SECRET_KEY,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true } // Set to true if using HTTPS
}));

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/style', express.static('./static/style'));
app.use('/scripts', express.static('./static/scripts'));
app.use('/src', express.static('./src'));
app.use('/img', express.static('./img'));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.use('/', router);
app.use('/circuits', router);
app.use('/circuit', router);
app.use('/api', router);
app.use('/teams', router);
app.use('/team&?', router);
app.use('/driver&?', router);
app.use('/mypage&?', router);

const server = http.createServer(app);
const io = socket(server);

app.get('/social', (req, res) => {
  fs.readFile('./views/social.html', (err, data) => {
    if(err) {
      res.send('Error');
    }
    else {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      res.end();
    }
  })
})

io.sockets.on('connection', (socket) => {
  socket.on('newUser', (name) => {
    socket.name = name;
    io.sockets.emit('update', {type: 'connect', name: 'server', message: name + ' has been connected'});
  })

  socket.on('message', (data) => {
    data.name = socket.name;
    socket.broadcast.emit('update', data);
  })

  socket.on('disconnect', () => {
    socket.broadcast.emit('update', {type: 'disconnect', name: 'SERVER', message: socket.name + ' has been disconnected'});
  })
})

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}...`);
})