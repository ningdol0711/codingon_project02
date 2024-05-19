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
