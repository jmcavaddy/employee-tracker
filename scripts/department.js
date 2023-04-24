const db = require('./connection.js');
const cTable = require('console.table');
const inquirer = require('inquirer');

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

// Function to add a department
const addDepartment = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of the department you would like to add?'
        }
    ]).then((answer) => {
        const sql = `INSERT INTO department (name) VALUES (?)`;
        const params = [answer.name];

        db.query(sql, params, (err, result) => {
            if (err) {
                console.log(err);
                return;
            }
            console.log(`
            ==============================
            Department Added
            ==============================
            `);
            }
        );
    });
};

module.exports = { viewDepartments, addDepartment };