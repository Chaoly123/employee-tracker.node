const connection = require("./connection");

class DB {
    constructor(connection) {
        this.connection = connection;
    }

    addDepartment(department) {
        return this.connection.query("INSERT INTO department SET ?", department);
    }
    viewDepartments() {
        return this.connection.query(
            "SELECT department.id, department.name, SUM(role.salary) AS utilized_budget FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id GROUP BY department.id, department.name;"
        );
    }
    addRoles(role) {
        return this.connection.query("INSERT INTO role SET ?", role);
    }

    viewRoles() {
        return this.connection.query(
            "SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id;"
        );
    }

    addEmployees(employee) {
        return this.connection.query("INSERT INTO employee SET ?", employee);
    }

    viewEmployees() {
        return this.connection.query(
            "SELECT employee.id, employee.title, department.name AS department, employee.salary FROM role LEFT JOIN department on employee.department_id = department.id;"
        );
    }

}

module.exports = new DB(connection);