var mysql = require('mysql2');
require('dotenv').config()
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '$uriyA@2003',
    database : 'nimbus'
});
module.exports = connection; 
