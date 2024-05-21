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

  try {
    const user = await DBUsers.findUserById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(pw, user.userPW);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user.userNUM, userEmail: user.userEmail },
      SECRET_KEY,
      { expiresIn: "1h" }
    );
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};

exports.userRegister = async (req, res) => {
  const { email, id, pw } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(pw, 10);
    const newUser = { userID: id, userPW: hashedPassword, userEmail: email };

    await DBUsers.createUser(newUser);
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};

exports.teams = (req, res) => {
  DBdata.getTeams((result) => {
    res.render('teams', {title: "Teams", teams: result});
  });
}

exports.team = (req, res) => {
  const dataString = req.query.data;
  if(dataString) {
    const data = JSON.parse(dataString);
    DBdata.getTeam(data, (result) => {
      console.log(result)
      res.render('team', {title: (result[0].TeamName), teamInfo: result});
    })
  }
}

exports.driver = (req, res) => {
  const dataString = req.query.data;
  if(dataString) {
    const data = JSON.parse(dataString);
    DBdata.getDriver(data, (result) => {
      console.log(result);
      res.render('driver', {title: "Driver", driverInfo: result});
    })
  }
}