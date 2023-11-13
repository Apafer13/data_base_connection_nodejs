const mysql = require('mysql2')

function connection(){
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'apafer2003',
        database: 'planning'
    })

    return connection;

} 

module.exports = {
    connection,
};