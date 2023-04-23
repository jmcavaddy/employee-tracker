// Import and require mysql2
const mysql = require('mysql2');

// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // MySQL password
      password: 'Wt^LKg977p33K3#qBUC#Acc',
      database: 'company_db'
    },
    console.log(`Connected to the company_db database.`)
  );

module.exports = db;