const mysql = require('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "chaos123",
    database: "employee_DB"
})

connection.connect(err => {
    if (err) throw err;
    init()
})

function init() {
    inquirer.prompt([
        {
            type: 'list',
            name: "choice",
            choices: ["Add Departments", "View Departments", "Add Roles", "View Roles", "Add Employees", "View Employees", "Done"],
            message: "What would you like to do?"
        }
    ]).then(({ choice }) => {
        if (choice == "Add Deppartments") {
            addDepartments()
        } else if (choice == "View Departments") {
            viewDepartments(); {
            } if (choice == "Add Roles") {
                addRoles(); {
                } if (choice == "View Roles") {
                    viewRoles(); {
                    } if (choice == "Add Employees") {
                        addEmployees(); {
                        } if (choice == "View Employees") {
                        } else {
                            console.log("bye")
                            connection.end()
                        }
                    };
                }

                function addDeparments() {
                    inquirer.prompt([
                        {
                            type: 'input',
                            name: 'newDepartment',
                            message: 'What is the new department name?'
                        }
                    ]).then(answer => {
                        let queryString = `
        INSERT INTO department(name)
        VALUES (?)`

                        connection.query(queryString, [answer.newDepartment], err => {
                            if (err) throw err;
                            init()
                        })
                    })
                }

                function addRoles() {
                    inquirer.prompt([
                        {
                            type: 'input',
                            name: 'newRoles',
                            message: 'What is the new roles?'
                        },
                        {
                            type: "input",
                            name: "newSalary",
                            message: "How much is the salary?"
                        },
                        {
                            type: "list",
                            name: "deparment",
                            message: "Which department does this role go to?"
                        }
                    ]).then(answer => {
                        let queryString = `
        INSERT INTO roles(name)
        VALUES (?)`

                        connection.query(queryString, [answer.newRoles], err => {
                            if (err) throw err;
                            init()
                        })
                    })
                }

                function addEmployees() {
                    inquirer.prompt([
                        {
                            type: 'input',
                            name: 'firstName',
                            message: 'What is the new employees first name?'
                        },
                        {
                            type: "input",
                            name: "secondName",
                            message: "What is the new employees last name?"
                        },
                        {
                            type: "input",
                            name: "field",
                            message: "What is the field of work?"
                        },
                    ]).then(answer => {
                        let queryString = `
        INSERT INTO employee(name)
        VALUES (?)`

                        connection.query(queryString, [answer.newEmployees], err => {
                            if (err) throw err;
                            init()
                        })
                    })
                }

                function viewDepartments() {
                    let queryString = `
    SELECT *
    FROM department`

                    connection.query(queryString, (err, data) => {
                        if (err) throw err;

                        console.log('\n')
                        console.table(data)
                        console.log('\n')

                        init()
                    })
                }

                function viewRoles() {
                    let queryString = `
    SELECT *
    FROM department`

                    connection.query(queryString, (err, data) => {
                        if (err) throw err;

                        console.log('\n')
                        console.table(data)
                        console.log('\n')

                        init()
                    })
                }

                function viewEmployees() {
                    let queryString = `
    SELECT *
    FROM department`

                    connection.query(queryString, (err, data) => {
                        if (err) throw err;

                        console.log('\n')
                        console.table(data)
                        console.log('\n')

                        init()
                    })
                }
            }
        }
    }
    )
}