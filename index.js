const inquirer = require('inquirer')
const express = require('express')
const mysql = require('mysql')

const PORT = process.env.PORT || 3000;

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'employee_trackerDB'
});

connection.connect(function(res, err) {
    if (err) throw err;
    console.log(res)
    userPrompt()
})

function userPrompt () {
    inquirer
        .prompt({
            name: 'action',
            type: 'rawlist',
            message: 'What would you like to do?',
            choices: [
                'View all employees',
                'View all employees by department',
                'View all employees by manager',
                'Add an employee',
                'Remove an employee',
                'Update employee role',
                'Update manager role',
                'Update employee manager',
                'View all roles',
                'Add a role',
                'Remove a role' 
            ]
        })
        .then (answer => {
            switch (answer.userPrompt) {
                case 'View all employees':
                    viewAllEmployees();
                    break;

                case 'View all employees by department':
                    viewAllEmployeesByDepartment();
                    break;

                case 'View all emplyees by manager':
                    viewAllEmployeesByManager();
                    break;

                case 'Add an employee':
                    addEmployee();
                    break;

                case 'Remove an employee':
                    removeEmployee();
                    break;

                case 'Update employee role':
                    updateEmployeeRole();
                    break;

                case 'Update employee manager':
                    updateEmployeeManager();
                    break;

                case 'View all roles':
                    viewAllRoles();
                    break;

                case 'Add role':
                    addRole();
                    break;

                case 'Remove role':
                    removeRole();
                    break;
            }
        })
}

