const mysql = require('mysql2');

const connect = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'f1',
})

exports.getCircuit = (cb) => {
  const sql = `select * from circuits`;
  connect.query(sql, (err, rows) => {
    if(err) {throw(err);}
    cb(rows);
  })
}