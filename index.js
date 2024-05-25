const express = require("express");
const session = require("express-session");
const http = require("http");
const fs = require("fs");
const socket = require("socket.io");
const app = express();
const router = require("./routes/Mainroute");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || "8000";
const SECRET_KEY = "YHS";

const server = http.createServer(app);
const io = socket(server);

app.use(session({
  secret: 'YHS',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: false,
    maxAge: 60 * 60 * 1000,
  }
}))

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

app.get("/social", (req, res) => {
  fs.readFile("./views/social.ejs", (err, data) => {
    if (err) {
      res.send("Error");
    } else {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      res.end();
    }
  });
});

io.on("connection", (socket) => {
  socket.on("newUser", (name) => {
    socket.name = name;
    io.sockets.emit("update", {
      type: "connect",
      name: "SERVER",
      message: `${name} has join chatroom`,
    });
  });

  socket.on("message", (data) => {
    data.name = socket.name;
    socket.broadcast.emit("update", data);
  });

  socket.on("disconnect", () => {
    socket.broadcast.emit("update", {
      type: "disconnect",
      name: "SERVER",
      message: `${socket.name} has left chatroom`,
    });
  });
});

app.get("*", (req, res) => {
  res.status(404).send("cannot find page");
});

server.listen(PORT, () => {
  console.log(`Server is running at ${PORT}...`);
});
