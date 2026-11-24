const sql = require('mssql');
require('dotenv').config();

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    options: {
        encrypt: false, // Dùng false cho local, khi lên Cloud sẽ đổi nếu cần
        trustServerCertificate: true
    }
};

const poolPromise = new sql.ConnectionPool(config)
    .connect()
    .then(pool => {
        console.log('Đã kết nối SQL Server thành công!');
        return pool;
    })
    .catch(err => {
        console.error('Lỗi kết nối SQL Server:', err);
        throw err;
    });

module.exports = { sql, poolPromise };