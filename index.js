const express = require("express");
const session = require("express-session");
const ws = require('ws');
const app = express();
const router = require("./routes/Mainroute");
const bodyParser = require("body-parser");
const PORT = 8000;
const SECRET_KEY = "YHS";

app.use(
  session({
    secret: SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { httpOnly: false },
  })
);

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/style", express.static("./static/style"));
app.use("/scripts", express.static("./static/scripts"));
app.use("/src", express.static("./src"));
app.use("/img", express.static("./img"));

app.use("/", router);
app.use("/circuits", router);
app.use("/circuit", router);
app.use("/api", router);
app.use("/teams", router);
app.use("/team&?", router);
app.use("/driver&?", router);
app.use("/mypage&?", router);
app.use("/social", router);

app.get("*", (req, res) => {
  res.status(404).send("cannot find page");
});

const server = app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}...`);
});

const wsServer = new ws.Server({ server: server });
const sockets = [];

wsServer.on("connection", (socket) => {
  console.log("client connected");
  sockets.push(socket);
  socket.on("message", (message) => {
    console.log(message);
    socket.send(message);
  });

  socket.on("listen", (err) => {
    console.log(err);
  });

  socket.on("close", () => {
    console.log("close connection");
  });
});
