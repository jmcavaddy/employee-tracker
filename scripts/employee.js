const cTable = require('console.table');
const db = require('./connection.js');


// Function to view all employees
const viewEmployees = () => {
    const sql = `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager_name
    FROM employee 
    LEFT JOIN role ON employee.role_id = role.id 
    LEFT JOIN department ON role.department_id = department.id 
    LEFT JOIN employee manager ON manager.id = employee.manager_id 
    ORDER BY employee.id`;

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