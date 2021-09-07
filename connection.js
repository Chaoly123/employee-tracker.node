
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


module.exports = connection;
