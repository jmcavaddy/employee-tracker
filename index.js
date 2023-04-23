const db = require('./scripts/connection.js');
const promptUser = require('./scripts/prompt.js');
const { viewDepartments } = require('./scripts/department.js');

// Function to start application
const startApp = async () => {
    // Prompt user to select an action
    const { action } = await promptUser();

    // Switch statement to handle user selection
    switch (action) {
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
        case 'Exit':
            db.end();
            process.exit();
        default:
            console.log(`Invalid action: ${action}`);
            break;
    }

    // Restart application
    startApp();

};

startApp();