CREATE DATABASE kpi_wages_db

GO

USE kpi_wages_db

GO

CREATE TABLE Positions (
	Id UNIQUEIDENTIFIER PRIMARY KEY,
	Title NVARCHAR(80) NOT NULL
)

GO

CREATE TABLE MaritalStatus (
	Id UNIQUEIDENTIFIER PRIMARY KEY,
	Title NVARCHAR(80) NOT NULL
)

GO

CREATE TABLE Employees (
	Id UNIQUEIDENTIFIER PRIMARY KEY,
	PersonalFile INT NULL,
	LastName NVARCHAR(100) NOT NULL,
	FirstName NVARCHAR(100) NOT NULL,
	MiddleName NVARCHAR(100) NULL,
	Position UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Positions(Id)
		ON UPDATE CASCADE
		ON DELETE SET NULL,
	DateOfBirth DATE NOT NULL,
	MaritalStatus UNIQUEIDENTIFIER FOREIGN KEY REFERENCES MaritalStatus(Id)
		ON UPDATE CASCADE
		ON DELETE SET NULL,
	Children INT DEFAULT(0) CHECK(Children >= 0),
	IsActive BIT NOT NULL DEFAULT(1),
	Created DATETIME NOT NULL
)

GO

CREATE TABLE Salaries (
	Id UNIQUEIDENTIFIER PRIMARY KEY,
	EmployeeId UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Employees(Id)
		ON UPDATE CASCADE
		ON DELETE NO ACTION,
	Amount DECIMAL(15, 2) NOT NULL,
	IsActive BIT NOT NULL DEFAULT(1),
	Created DATETIME NOT NULL
)

GO

CREATE TABLE Bonuses (
	Id UNIQUEIDENTIFIER PRIMARY KEY,
	EmployeeId UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Employees(Id)
		ON UPDATE CASCADE
		ON DELETE NO ACTION,
	[Period] DATE CHECK(DAY([Period]) = 1),
	Amount DECIMAL(15, 2) NOT NULL,
	Created DATETIME NOT NULL
)

GO

CREATE TABLE Allowance (
	Id UNIQUEIDENTIFIER PRIMARY KEY,
	EmployeeId UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Employees(Id)
		ON UPDATE CASCADE
		ON DELETE NO ACTION,
	[Period] DATE CHECK(DAY([Period]) = 1),
	Amount DECIMAL(15, 2) NOT NULL,
	Created DATETIME NOT NULL
)

GO

CREATE TABLE SickLeaves (
	Id UNIQUEIDENTIFIER PRIMARY KEY,
	EmployeeId UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Employees(Id)
		ON UPDATE CASCADE
		ON DELETE NO ACTION,
	StartDate DATE NOT NULL,
	EndDate DATE NOT NULL,
	Created DATETIME NOT NULL,
	CONSTRAINT CK_SickLeaves_ValidDates CHECK(EndDate >= StartDate)
)