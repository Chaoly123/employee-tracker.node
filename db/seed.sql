USE employees;

INSERT INTO department
    (name)

VALUES 
    ('Human Resources'),
    ('Sales'),
    ('Manager');

INSERT INTO roles (title, salary, department_id)
    
VALUES
    ('HR Manager', 120000, 1),
    ('HR Person', 75000,1)
    ('Sales Manager', 80500, 2),
    ('Sale Person', 90200, 2),
    ('Owner Manager', 200230, 3),
    ('Store Manager', 67900, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)

VALUES
    ('Chao', 'Ly', 1, 1),
    ('Nick', 'Nay', 1, 1),
    ('Hello', 'World', 2, 2),
    ('Anna', 'Frozen', 2, 2),
    ('Nero', 'Hero', 3, 3),
    ('Yuna', 'Here', 3, 3);