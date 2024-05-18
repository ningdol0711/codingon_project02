const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'f1'
});

exports.findUserById = async (id) => {
    let connection;
    try {
        connection = await pool.getConnection();
        const [rows] = await connection.query('SELECT * FROM Users WHERE userID = ?', [id]);
        return rows[0];
    } catch (error) {
        console.error('Database query error', error);
        throw error;
    } finally {
        if (connection) connection.release();
    }
};

exports.createUser = async (user) => {
    let connection;
    const { userID, userPW, userEmail } = user;
    try {
        connection = await pool.getConnection();
        await connection.query('INSERT INTO Users (userID, userPW, userEmail) VALUES (?, ?, ?)', [userID, userPW, userEmail]);
    } catch (error) {
        console.error('Database insert error', error);
        throw error;
    } finally {
        if (connection) connection.release();
    }
};
