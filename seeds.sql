DROP DATABASE IF EXISTS employeeDB;
CREATE database employeeDB;

USE employeeDB;

CREATE TABLE department (
  departmentID INT NOT NULL AUTO_INCREMENT,
  departmentName VARCHAR(30) NOT NULL,
  PRIMARY KEY (departmentID)
);

CREATE TABLE role (
  roleID INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary DEC NOT NULL,
  departmentID INT,
  PRIMARY KEY(roleID),
  CONSTRAINT FK_department
    FOREIGN KEY (departmentID) REFERENCES department(departmentID),
 
);

CREATE TABLE employee (
    employeeID INT NOT NULL AUTO_INCREMENT,
    firstName VARCHAR(30) NOT NULL,
    lastName VARCHAR(30) NOT NULL,
    employeeRole INT,
    PRIMARY KEY(employeeID),
    CONSTRAINT FK_role FOREIGN KEY (employeeRole)
    REFERENCES role(roleID),
    managerID INT,
    CONSTRAINT FK_manager
    FOREIGN KEY (managerID)
    REFERENCES employee(employeeID)
    
)

INSERT INTO department(department_name)
VALUES ('Engineering'), ('Sales'), ('Finance'), ('Legal')

INSERT INTO role(title, salary, department_id)
VALUES ('Sales lead', 100000, 2), 
       ('Sales person', 80000, 2), 
       ('Lead Engineer', 150000, 1), 
       ('Software engineer', 120000, 1), 
       ('Accountant', 125000, 3),
       ('Legal Team Lead', 250000, 4),
       ('Lawyer' 190000, 4)

INSERT INTO employee(firstName, lastName, employeeRole, managerID)
VALUES ('Jacob', 'Whisler', 1, 1),
       ('Michael', 'Scott', 2, 1),
       ('Dwight', 'Shrute', 3, 2),
       ('Pam', 'Beasley', 3, 2),
       ('Jim', 'Halpert', 3, 2),
       ('Kevin', 'Malone', 4, 3),
       ('Angela', 'Martin', 4, 3),
       ('Ryan', 'Howard', 5, 4),
       ('Creed', 'Bratton', 6, 4);



