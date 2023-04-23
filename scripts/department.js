const db = require('./connection.js');
const cTable = require('console.table');

// Function to view all departments
const viewDepartments = () => {
    const sql = `SELECT * FROM department`;

    db.query(sql, (err, rows) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log(`
        ==============================
        Departments
        ==============================
        `);
        console.table(rows);
    });
};

module.exports = { viewDepartments };