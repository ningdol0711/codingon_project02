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
  const values = [userID, userPW, userEmail];
  connect.query(sql, values, (err, rows) => {
    if (err) {
      throw err;
    }
    cb(rows);
  });
};

exports.updateUser = (user, cb) => {
  const sql = `UPDATE Users SET userName = ?, Country = ?, City = ?, State = ?, postalCode = ?, Address1 = ?, Address2 = ? WHERE userID = ?`;
  const {
    userName,
    Country,
    City,
    State,
    postalCode,
    Address1,
    Address2,
    userID
  } = user;
  const values = [
    userName,
    Country,
    City,
    State,
    postalCode,
    Address1,
    Address2,
    userID
  ];

  connect.query(sql, values, (err, rows) => {
    if (err) {
      throw err;
    }
    cb(rows);
  });
};
