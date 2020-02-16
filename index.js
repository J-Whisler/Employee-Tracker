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

                default:
                    connection.end()
                    break;
        }      
} 

 function viewAllEmployees () {
    connection
        .query(`SELECT employee.employeeID, employee.firstName, employee.lastName, department.departmentName, role.title, role.salary
        FROM employee
        LEFT JOIN role ON employee.employeeRole = role.roleID
        LEFT JOIN department ON role.departmentId = department.departmentID
        ORDER BY employee.employeeID`, (err, res) => {
    
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
                        `,    
                    }
                ])
                .then((res) => {
                    let query = `INSERT INTO employee SET ?`
                    const values = {
                        firstName: res.firstName,
                        lastName: res.lastName,
                        employeeRole:res.roleID,
                        // title: res.title,
                        // salary: res.salary
                    }
                 connection.query(query, values, (err) => {
                     if (err) throw err;
                     console.log('New employee added!')
                    //  console.table(results)
                     userPrompt();
                 })
                    // console.log(res)
                })    
    }
  )
}




function viewAllRoles () {
    connection.query(`SELECT title FROM role`, (err, res) => {
        console.table(res)
        if (err) throw err;
        userPrompt();
    })
}

function addRole () {
    connection.query(`SELECT * FROM role`, (err, res) => {
        if (err) throw err

        inquirer
            .prompt([
                {
                    name: 'newRoleTitle',
                    type: 'input',
                    message: 'Enter the the of the role you would like to add'
                },
                {
                    name: 'newRoleID',
                    type: 'number',
                    message: 'Enter the ID you would like to give this role.  Make sure the ID is not being used for another role'
                },
                {
                    name: 'newRoleSalary',
                    type: 'number',
                    message: 'Enter the salary of the new role'
                }
            ])
            .then((res) => {
                let query = `INSERT INTO role SET ?`
                const values = {
                    title: res.newRoleTitle,
                    roleID: res.newRole,
                    salary: res.newRoleSalary
                }
                connection.query(query, values, (err) => {
                    if (err) throw err
                    console.log('New role added!')
                    userPrompt();
                })
            }
    )})
}


// console.table(viewAllEmployees())
// console.table(['hello', 'asaasf', 'sgdsg'])