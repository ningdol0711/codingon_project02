const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const DBUsers = require("../models/DBUsers");
const SECRET_KEY = "YHS";
const DBdata = require("../models/DBdata");

exports.main = (req, res) => {
  res.render("index", { title: "Main" });
};

exports.circuits = (req, res) => {
  DBdata.getCircuits((result) => {
    const circuits = {};
    result.forEach((row) => {
      if (!circuits[row.Country]) {
        circuits[row.Country] = {};
      }
      circuits[row.Country][row.CircuitName] = [row.Latitude, row.Longitude];
    });
    res.render("circuits", { title: "Circuits", circuits: circuits });
  });
};

exports.circuit = (req, res) => {
  const dataString = req.query.data;
  if (dataString) {
    const data = JSON.parse(dataString);
    const circuitName = data.circuit;
    res.render("circuit", { title: "Circuit", circuitName: circuitName });
  }
};

exports.userLogin = async (req, res) => {
  const { id, pw } = req.body;
  DBUsers.findUserById(id, async (result) => {
    if (!result) {
      return res.status(404).json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(pw, result[0].userPW);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: result[0].userNUM, userPW: result[0].userPW },
      SECRET_KEY,
      { expiresIn: "1h" }
    );
    req.session.userID = result[0].userID;
    req.session.save((err) => {
      if (err) {
        return res.status(500).json({ message: "Session save error" });
      }
      res.json({ token });
    });
  });
};

exports.userRegister = async (req, res) => {
  const { email, id, pw } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(pw, 7);
    const newUser = { userID: id, userPW: hashedPassword, userEmail: email };

    const user = DBUsers.findUserById(id);

    if (user) {
      res.status(409).json({ message: "This ID is already taken" });
    } else {
      DBUsers.createUser(newUser);
      res.status(201).json({ message: "User registered successfully" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};

exports.userLogout = async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Logout failed" });
    }

    res.clearCookie("userID"); // Clear the session cookie
    res.json({ message: "Logout successful" });
  });
};

exports.updateUser = (req, res) => {
  const user = {
    userID: req.body.userID,
    userName: req.body.userName,
    userPW: req.body.userPW,
    Country: req.body.Country,
    City: req.body.City,
    State: req.body.State,
    postalCode: req.body.postalCode,
    Address1: req.body.Address1,
    Address2: req.body.Address2,
  };
  console.log(user);

  DBUsers.findUserById(user.userID, async (result) => {
    if(!result) {
      return res.status(404).json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(user.userPW, result[0].userPW);
    if(!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    DBUsers.updateUser(user, (result) => {
      res.redirect("/mypage");
    });
  })

};

exports.teams = (req, res) => {
  DBdata.getTeams((result) => {
    res.render("teams", { title: "Teams", teams: result });
  });
};

exports.team = (req, res) => {
  const dataString = req.query.data;
  if (dataString) {
    const data = JSON.parse(dataString);
    DBdata.getTeam(data, (result) => {
      res.render("team", { title: result[0].TeamName, teamInfo: result });
    });
  }
};

exports.driver = (req, res) => {
  const dataString = req.query.data;
  if (dataString) {
    const data = JSON.parse(dataString);
    DBdata.getDriver(data, (result) => {
      res.render("driver", { title: "Driver", driverInfo: result });
    });
  }
};

exports.mypage = (req, res) => {
  if (!req.session.userID) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  DBUsers.findUserById(req.session.userID, async (result) => {
    res.render("mypage", { title: "MyPage", userInfo: result[0] });
  });
};

exports.social = (req, res) => {
  res.render("social", { title: "Social" });
};

exports.schedule = async (req, res) => {
  try {
      const schedule = await DBdata.schedule();
      res.render('schedule', {title: "Schedule", schedule});
  } catch (error) {
      res.status(500).send('Error fetching F1 schedule');
  }
};