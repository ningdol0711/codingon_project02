const mysql = require("mysql2");

const connect = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "f1",
});

exports.findUserById = (id, cb) => {
  const sql = `SELECT * from Users where userID = ?`;
  const value = id;
  connect.query(sql, value, (err, rows) => {
    if (err) {
      throw err;
    }
    cb(rows);
  });
};

exports.createUser = (user, cb) => {
  const sql = `INSERT INTO Users (userID, userPW, userEmail) VALUES (?, ?, ?)`;
  const { userID, userPW, userEmail } = user;
  connect.query(sql, [userID, userPW, userEmail], (err, rows) => {
    if (err) {
      throw err;
    }
    cb(rows);
  });
};