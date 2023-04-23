const cTable = require('console.table');
const db = require('./connection.js');

// Function to view all employees
const viewEmployees = () => {
    const sql = `SELECT * FROM employee`;

    db.query(sql, (err, rows) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log(`
        ==============================
        Employees
        ==============================
        `);
        console.table(rows);
    });
};

module.exports = { viewEmployees };