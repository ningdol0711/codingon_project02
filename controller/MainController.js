const circuit = require('../models/Circuit');

exports.main = (req, res) => {
  res.render('index', {title: "Main"});
}

exports.circuits = (req, res) => {
  circuit.getCircuit(result => {
    const circuits = {};
    result.forEach(row => {
      if (!circuits[row.Country]) {
        circuits[row.Country] = {};
      }
      circuits[row.Country][row.CircuitName] = [row.Latitude, row.Longitude];
    });
    res.render('circuits', { title: "Circuits", circuits: circuits });
  })
}