const inquirer = require('inquirer')

const mysql = require('mysql')
const consoleTable = require('console.table')

const questions = require('./question')



const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root521',
    database: 'employeeDB'
});

connection.connect(err => {
    if (err) throw err;   
})

userPrompt()
async function userPrompt () {
    const results = await inquirer.prompt(questions.prompts);
        switch (results.prompts) {
                case 'View all employees':
                    viewAllEmployees();
                    break;

                case 'Add an employee':
                    addEmployee();
                    break;

                case 'View all departments':
                    viewDepartments();
                    break;

                case 'Add a department':
                    addDepartment();
                    break;

                case 'Remove a department':
                    removeDepartment();
                    break;
                
                case 'View all roles':
                    viewAllRoles()
                    break;

                case 'Add a role':
                    addRole();
                    break;

                case 'Exit':
                    exit()

                default:
                    connection.end()
                    break;
        }      
} 

 function viewAllEmployees () {
    connection
        .query(`SELECT employee.employeeID, employee.firstName, employee.lastName FROM employee`, (err, res) => {
    
    console.table(res)
    if (err) throw err;
    userPrompt()
  });
}

function addEmployee () {
    connection
        .query(`SELECT * FROM employee`, (err, results) => {
            if (err) throw err

            inquirer
                .prompt([
                    {
                        name: 'firstName',
                        type: 'input',
                        message: 'Enter the first name of the new employee'
                    },
                    {
                        name: 'lastName',
                        type: 'input',
                        message: 'Enter the last name of the new employee'
                    },
                    {
                        name: 'roleID',
                        type: 'number',
                        message: `Enter the new employee\'s role id 
                        (1 = Sales Lead, 2 = Sales Person, 3 = Lead Engineer, 4 = Software Engineer, 5 = Accountant, 6 = Legal Team Lead, 7 = Lawyer)
                        ` 
                    }
                ])
                .then((res) => {
                    let query = `INSERT INTO employee SET ?`
                    const values = {
                        firstName: res.firstName,
                        lastName: res.lastName,
                        employeeRole: res.roleID,
                        
                    }
                 connection.query(query, values, (err) => {
                     if (err) throw err;
                     console.log('New employee added!')
                     console.table(res)
                     userPrompt();
                 })
                   
                })    
    }
  )
}


function viewDepartments () {
    connection.query(`SELECT departmentName FROM department`, (err, res) => {
        console.table(res)
        if (err) throw err;
    userPrompt()
})
}

function addDepartment () {

            inquirer
                .prompt([
                    {
                        name: 'department',
                        type: 'input',
                        message: 'Enter the name of the department you want to add'
                    }
                ])
                .then((res) => {
                    let query = `INSERT INTO department SET ?`
                    const values = {
                        departmentName: res.department
                        
                    }
                 connection.query(query, values, (err) => {
                     if (err) throw err;
                     console.log('New department added!')
                     console.table(res)
                     userPrompt();
                 })
                   
                })    
    }
  


function removeDepartment () {
    inquirer
            .prompt([
                {
                    name: 'departmentName',
                    type: 'input',
                    message: 'Enter the name of the department you would like to remove'
                },
            
            ])
            .then((res) => {
                let query = `DELETE FROM deparment WHERE ? `
                const values = {
                     departmentName: res.departmentName
                }
             connection.query(query, values, (err) => {
                 if (err) throw err;
                 console.log('Department removed!')
                 console.table(res)
                 userPrompt();
             })
            
})
}



function viewAllRoles () {
    connection.query(`SELECT title FROM role`, (err, res) => {
        console.table(res)
        if (err) throw err;
        userPrompt();
    })
}

function addRole () {
    inquirer
        .prompt([
            {
                name: 'role',
                type: 'input',
                message: 'Enter the name of the role you want to add'
            },
            {
                name: 'roleSalary',
                type: 'number',
                message: 'Enter the salary of the new role'
            }
            ])
            .then((res) => {
                let query = `INSERT INTO role SET ?`
                const values = {
                    title: res.role,
                    salary: res.roleSalary       
                }
                connection.query(query, values, (err) => {
                    if (err) throw err;
                    console.log('New role added!')
                    console.table(res)
                    userPrompt();
                })
                   
    })    
}

function exit () {
    connection.end()
}