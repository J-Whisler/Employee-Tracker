const prompts = [
    {
        type: "rawlist",
        name: "prompts",
        message: "What would you like to do?",
        choices: [
            'View all employees',
            'Add an employee',
            'View all departments',
            'Add a department',
            'Remove a department',
            'View all roles',
            'Add a role',
            'Exit'
        ]
    }
]



module.exports = { prompts }