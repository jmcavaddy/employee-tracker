const inquirer = require('inquirer');
const choicesList = [
    'View all departments',
    'View all roles',
    'View all employees',
    'Add a department',
    'Add a role',
    'Add an employee',
    'Update an employee role',
    'Exit'
];
const mysql = require('mysql2');
const cTable = require('console.table');

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

// Prompt user to select an action
const startApp = () =>{ 
    inquirer.prompt([
    {
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: choicesList,
    }
    ])
    .then((answer) => {
        // exit app if user selects exit
        if (answer.action === 'Exit') {
            process.exit();
        }
        // otherwise, run the actionSwitch function
        else {
            switch (answer.action) {
                case 'View all departments':
                    viewDepartments();
                    break;  
                case 'View all roles':
                    viewRoles();
                    break;  
                case 'View all employees':
                    viewEmployees();
                    break;
                case 'Add a department':
                    addDepartment();
                    break;
                case 'Add a role':
                    addRole();
                    break;
                case 'Add an employee':
                    addEmployee();
                    break;
                case 'Update an employee role':
                    updateEmployeeRole();
                    break;
                default:
                    console.log(`Invalid action: ${answer.action}`);
                    break;

            }
        }
    });
};

// Function to view all departments
const viewDepartments = () => {
    const sql = `SELECT * FROM department`;

    db.promise().query(sql)
    .then(function(results) {
        console.table(results[0]);
    })
    .then(() => {
        startApp();
    })
    .catch(err => console.log(err));
};

// Function to view all roles
const viewRoles = () => {
    const sql = `SELECT role.id, role.title, role.salary, department.name AS department
    FROM role
    INNER JOIN department ON role.department_id = department.id`;

    db.promise().query(sql)
    .then(function(results) {
        console.table(results[0]);
    })
    .then(() => {
        startApp();
    })
    .catch(err => console.log(err));
};

// Function to view all employees
const viewEmployees = () => {
    const sql = `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary,
    CONCAT(manager.first_name, ' ', manager.last_name) AS manager_name
    FROM employee 
    LEFT JOIN role ON employee.role_id = role.id 
    LEFT JOIN department ON role.department_id = department.id 
    LEFT JOIN employee manager ON manager.id = employee.manager_id 
    ORDER BY employee.id`;

    db.promise().query(sql)
    .then(function(results) {
        console.table(results[0]);
    })
    .then(() => {
        startApp();
    })
    .catch(err => console.log(err));
};

// Function to add a department
const addDepartment = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of the department you would like to add?',
            waitUserInput: true
        }
    ]).then((answer) => {
        const sql = `INSERT INTO department (name) VALUES (?)`;
        const params = [answer.name];

        db.promise().query(sql, params).then(() => {
        startApp();
        })
    });
};

// Function to get department names
const getDepartmentNames = function(){
    
    const sql = `SELECT * FROM department`;
    const departmentNames = [];

    db.promise().query(sql)
    .then(function(results) {
        results[0].forEach((department) => {
            // add each department's name and id to the departmentNames array
            departmentNames.push({name: department.name, value: department.id});

        });
    })
    .catch(err => console.log(err));

    console.log(departmentNames);
    
    return departmentNames;


};

// Function to add a role
const addRole = () => {
    // Populate departmentNames array with department names that can be used as choices for the department_id question
    const departmentNames = getDepartmentNames();

    inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'What is the title of the role you would like to add?'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is the salary of the role you would like to add?'
        },
        {
            type: 'list',
            name: 'department_id',
            message: 'What is the department of the role you would like to add?',
            choices: departmentNames
        }
    ]).then((answer) => {
        const sql = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`;
        const params = [answer.title, answer.salary, answer.department_id];

        db.promise().query(sql, params).then(() => {
            startApp();
        })
    });
};

// Function to get role titles
const getRoleTitles = function(){

    const sql = `SELECT * FROM role`;
    const roleTitles = [];

    db.promise().query(sql)
    .then(function(results) {
        results[0].forEach((role) => {
            // add each role's title and id to the roleTitles array
            roleTitles.push({name: role.title, value: role.id});

        });
    })
    .catch(err => console.log(err));

    return roleTitles;

};

// Function to get manager names
const getManagerNames = function(){

    const sql = `SELECT * FROM employee`;
    const managerNames = [];

    db.promise().query(sql)
    .then(function(results) {
        results[0].forEach((employee) => {
            // only add employees who are managers to the managerNames array (ie. employees who have a null manager_id)
            if (employee.manager_id === null) {
                // add each manager's name and id to the managerNames array
                managerNames.push({name: employee.first_name + ' ' + employee.last_name, value: employee.id});
            }

        });
    })
    .catch(err => console.log(err));

    return managerNames;

};

// Function to add an employee
const addEmployee = () => {

    // Populate roleTitles array with role titles that can be used as choices for the role_id question
    const roleTitles = getRoleTitles();

    // Populate managerNames array with manager names that can be used as choices for the manager_id question
    const managerNames = getManagerNames();

    inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'What is the first name of the employee you would like to add?'
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'What is the last name of the employee you would like to add?'
        },
        {
            type: 'list',
            name: 'role_id',
            message: 'What is the role id of the employee you would like to add?',
            choices: roleTitles
        },
        {
            type: 'list',
            name: 'manager_id',
            message: "Who is the new employee's manager?",
            choices: managerNames
        }
    ]).then((answer) => {
        const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
        const params = [answer.first_name, answer.last_name, answer.role_id, answer.manager_id];

        db.promise().query(sql, params).then(() => {
            startApp();
            })
    });
};

// Function to get employee names
const getEmployeeNames = function(){

    const sql = `SELECT * FROM employee`;
    const employeeNames = [];

    db.promise().query(sql)
    .then(function(results) {
        results[0].forEach((employee) => {
            employeeNames.push({name: employee.first_name + ' ' + employee.last_name, value: employee.id});
        });        
    })
    .catch(err => console.log(err));

    return [employeeNames];
};

// Function to update an employee's role
const updateEmployeeRole = () => {

    // Populate employeeNames array with employee names that can be used as choices for the employee_id question
    const employeeNames = getEmployeeNames();

    // Populate roleTitles array with role titles that can be used as choices for the role_id question
    const roleTitles = getRoleTitles();

    inquirer.prompt([
        {
            type: 'list',
            name: 'employee_id',
            message: 'Which employee would you like to update?',
            choices: employeeNames
        },
        {
            type: 'list',
            name: 'role_id',
            message: 'What is the new role id of the employee you would like to update?',
            choices: roleTitles
        }
    ]).then((answer) => {
        const sql = `UPDATE employee SET role_id = ? WHERE id = ?`;
        const params = [answer.role_id, answer.employee_id];

        db.promise().query(sql, params).then(() => {
            startApp();
            })
    });
};

startApp();