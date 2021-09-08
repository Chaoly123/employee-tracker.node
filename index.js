const mysql = require('mysql');
const inquirer = require('inquirer');

const indexdb = require('./db');


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
    inquirer.prompt([
        {
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
                "Done"
            ]
        }
    ]).then(res => {
        let choice = res.choice;
        console.log(res)
        switch (choice) {
            case "Add Departments":
                addDepartments();
                break;
            case "View Departments":
                viewDepartments();
                break;
            case "Add Roles":
                addRoles();
                break;
            case "View Roles":
                viewRoles();
                break;
            case "Add Employees":
                addEmployees();
                break;
            case "View Employees":
                viewEmployees();
                break;
            default:
                done();
        }
    }
    )
};

function addDepartments() {
    inquirer.prompt([
        {
            name: "name",
            message: "The name of the department?"
        }
    ])
        .then(res => {
            let name = res;
            indexdb.addDepartments(name.choice).then(init())
        })
}

function viewDepartments() {
    indexdb.viewDepartments()
        .then(([rows]) => {
            let departments = rows;
            console.log("\n");
            console.table(departments);
        })
        .then(() => init());
}

function addRoles() {
    indexdb.addRoles()
        .then(([rows]) => {
            let departments = rows;
            const departmentChoices = departments.map(({ id, name }) => ({
                name: name,
                value: id
            }));

            inquirer.prompt([
                {
                    name: "title",
                    message: "What is the name of the role?"
                },
                {
                    name: "salary",
                    message: "What is the salary of the role?"
                },
                {
                    type: "list",
                    name: "department_id",
                    message: "Which department does the role belong to?",
                    choices: departmentChoices
                }
            ])
                .then(role => {
                    indexdb.createRole(role)
                        .then(() => console.log(`Added ${role.title} to the database`))
                        .then(() => init())
                })
        })
}

function viewRoles() {
    indexdb.viewRoles()
        .then(([rows]) => {
            let roles = rows;
            console.log("\n");
            console.table(roles);
        })
        .then(() => init());
}

function addEmployees() {
    inquirer.prompt([
        {
            name: "first_name",
            message: "What is the employee's first name?"
        },
        {
            name: "last_name",
            message: "What is the employee's last name?"
        }
    ])
        .then(res => {
            let firstName = res.first_name;
            let lastName = res.last_name;
        })
}

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

function done() {
    console.log("bye!");
    process.exit();
}