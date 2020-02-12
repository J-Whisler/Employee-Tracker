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
                'Add department',
                'Add role',
                'Add employee',
                'View department',
                'View role',
                'View employee',
                'Delete department',
                'Delete role',
                'Delete employee',
                'View Budget'  
            ]
        })
        .then (function(answer) {
            switch (answer.prompt) {
                case 'Add department':
                    addDepartment();
                    break;

                case 'Add role':
                    addRole();
                    break;

                case 'Add employee':
                    addEmployee();
                    break;

                case 'View department':
                    viewDepartment();
                    break;

                case 'View role':
                    viewRole();
                    break;

                case 'View employee':
                    viewEmployee();
                    break;

                case 'Delete department':
                    deleteDepartment();
                    break;

                case 'Delete role':
                    deleteRole();
                    break;

                case 'Delete employee':
                    deleteEmployee();
                    break;

                case 'View budget':
                    viewBudget();
                    break;
            }
        })
}

// function addDepartment () {
//     inquirer
//         .prompt({
//             name: 'department',
//             type: 'input',
//             message: 'Enter the name of the department you would like to add'
//         })
//         .then(function(answer) {
//             const query = 'INSERT INTO department'
//         })
// }