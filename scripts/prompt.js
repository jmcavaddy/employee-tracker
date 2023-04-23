const inquirer = require('inquirer');

// Prompt user to select an action
const promptUser = () => {
    return inquirer.prompt([
        {
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: [
            'View all departments',
            'View all roles',
            'View all employees',
            'Add a department',
            'Add a role',
            'Add an employee',
            'Update an employee role',
            'Exit'
        ]
        }
    ]);
};

// Export promptUser function
module.exports = promptUser;