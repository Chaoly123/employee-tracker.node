const mysql = require('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "chaos123",
    database: "employee_DB"
});

connection.connect(err => {
    if (err) throw err;
    init()
})

function init() {
    inquirer.prompt({
        name: "choice",
        type: 'list',
        message: "What would you like to do?",
        choices: [
            "Add Departments",
            "View Departments",
            "Add Roles",
            "View Roles",
            "Add Employees",
            "View Employees",
            "Update Employees",
            "Done"]
    }).then((answer) => {
        if (answer.choice == "Add Departments") {
            addDepartments();
        } else if (answer.choice == "View Departments") {
            viewDepartments();
        } else if (answer.choice == "Add Roles") {
            addRoles();
        } else if (answer.choice == "View Roles") {
            viewRoles();
        } else if (answer.choice == "Add Employees") {
            addEmployees();
        } else if (answer.choice == "View Employees") {
            viewEmployees();
        } else if (answer.choice == "Update Employees") {
            updateEmployees();
        } else if (answer.choice == "Done") {
            console.log("bye")
            connection.end();
        }
    });
};

function addDepartments() {
    inquirer.prompt([
        {
            type: 'input',
            message: 'What is the new department name?',
            name: 'newDepartment'
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
};

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
};

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
};

function viewRoles() {
    let queryString = `
SELECT *
FROM Roles`

    connection.query(queryString, (err, data) => {
        if (err) throw err;

        console.log('\n')
        console.table(data)
        console.log('\n')

        init()
    })
};

function addEmployees() {
    inquirer.prompt([
        {
            type: 'input',
            message: 'What is the new employees first name?',
            name: 'firstName'
        },
        {
            type: "input",
            message: "What is the new employees last name?",
            name: "secondName"
        },
        {
            type: "input",
            message: "What is the employee's role id?",
            name: "roleID"
        },
        {
            type: "input",
            message: "What is the employee's Manager id?",
            name: "managerId"
        }
    ]).then(answer => {
        let queryString = `
INSERT INTO employee(name)
VALUES (?)`

        connection.query(queryString, [answer.newEmployees], err => {
            if (err) throw err;
            init()
        })
    })
};

function viewEmployees() {
    let queryString = `
SELECT *
FROM Employees`

    connection.query(queryString, (err, data) => {
        if (err) throw err;

        console.log('\n')
        console.table(data)
        console.log('\n')

        init()
    })
};