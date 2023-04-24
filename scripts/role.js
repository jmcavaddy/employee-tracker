const cTable = require('console.table');
const db = require('./connection.js');


// Function to view all roles
const viewRoles = () => {
    const sql = `SELECT role.id, role.title, role.salary, department.name AS department FROM role INNER JOIN department ON role.department_id = department.id`;

    db.query(sql, (err, rows) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log(`
        ==============================
        Roles
        ==============================
        `);
        console.table(rows);
    });
};

module.exports = { viewRoles };