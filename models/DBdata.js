const mysql = require("mysql2");

const connect = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "f1",
});

exports.getCircuits = (cb) => {
  const sql = `select * from circuits`;
  connect.query(sql, (err, rows) => {
    if (err) {
      throw err;
    }
    cb(rows);
  });
};

exports.getTeams = (cb) => {
  const sql = `select * from teams`;
  connect.query(sql, (err, rows) => {
    if (err) {
      throw err;
    }
    cb(rows);
  });
};

exports.getTeam = (TeamID, cb) => {
  const sql = `SELECT Drivers.*, Teams.* FROM Drivers INNER JOIN Teams ON Drivers.TeamID = Teams.TeamID WHERE Teams.TeamID = ?;`;
  const values = TeamID;
  connect.query(sql, values, (err, rows) => {
    if (err) {
      throw err;
    }
    cb(rows);
  });
};

exports.getDriver = (DriverID, cb) => {
  const sql = `SELECT Drivers.*, Teams.TeamName FROM Drivers INNER JOIN Teams ON Drivers.TeamID = Teams.TeamID WHERE Drivers.DriverID = ?;`;
  const values = [DriverID];
  connect.query(sql, values, (err, rows) => {
    if (err) {
      throw err;
    }
    cb(rows);
  });
};
