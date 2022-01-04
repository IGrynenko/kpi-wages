USE kpi_wages_db

SELECT * FROM Employees
WHERE IsActive = 1

-- show empolyees and the number of sick leaves taken in a particular year
DECLARE @year INT = 2021;

SELECT e.Id, e.LastName, e.FirstName, e.MiddleName, p.Title,
CASE
	WHEN s.NumOfDaysOff IS NOT NULL THEN s.NumOfDaysOff
	WHEN s.NumOfDaysOff IS NULL THEN 0
END AS NumOfDaysOff
FROM Employees AS e
	INNER JOIN Positions AS p
		ON p.Id = e.Position
	INNER JOIN MaritalStatus AS m
		ON e.MaritalStatus = m.Id
	LEFT JOIN (SELECT EmployeeId, ABS(DATEDIFF(DAY, EndDate, StartDate)) + 1 AS NumOfDaysOff
			   FROM SickLeaves
			   WHERE DATEPART(YEAR, EndDate) = @year AND DATEPART(YEAR, StartDate) = @year) AS s
		ON s.EmployeeId = e.Id
WHERE e.IsActive = 1
ORDER BY NumOfDaysOff DESC, LastName


-- count those who have birthdays in the same month
SELECT DATEPART(MONTH, DateOfBirth) AS [Month], COUNT(*) AS [Count] FROM Employees
WHERE IsActive = 1
GROUP BY DATEPART(MONTH, DateOfBirth)
ORDER BY [Month]

-- get employess with highest and lowest salaries
SELECT e.Id, e.LastName, e.FirstName, e.MiddleName, p.Title, s.Amount
FROM Employees AS e
	INNER JOIN Salaries AS s
		ON e.Id = s.EmployeeId
			AND s.IsActive = 1
	INNER JOIN Positions AS p
		ON p.Id = e.Position
WHERE s.Amount = (SELECT MAX(Amount) FROM Salaries)
	AND e.IsActive = 1
UNION
SELECT e.Id, e.LastName, e.FirstName, e.MiddleName, p.Title, s.Amount
FROM Employees AS e
	INNER JOIN Salaries AS s
		ON e.Id = s.EmployeeId
			AND s.IsActive = 1
	INNER JOIN Positions AS p
		ON p.Id = e.Position
WHERE s.Amount = (SELECT MIN(Amount) FROM Salaries)
	AND e.IsActive = 1