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
  } else {
    res.status(400).send("Bad Request");
  }
};