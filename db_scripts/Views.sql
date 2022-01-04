-- get current employees
CREATE VIEW View_Employees_Info AS
SELECT e.Id, e.PersonalFile, e.LastName, e.FirstName, e.MiddleName, p.Title as Position,
	   s.Amount as Salary, e.DateOfBirth, m.Title as MaritalStatus, e.Children
FROM Employees AS e
	INNER JOIN Positions AS p
		ON p.Id = e.Position
	INNER JOIN MaritalStatus AS m
		ON e.MaritalStatus = m.Id
	INNER JOIN Salaries AS s
		ON e.Id = s.EmployeeId
			AND s.IsActive = 1
WHERE e.IsActive = 1