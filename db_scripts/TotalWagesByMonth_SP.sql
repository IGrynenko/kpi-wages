CREATE PROCEDURE TotalWagesByMonth @DATE DATE
AS

DECLARE @MDAYS INT =  DAY(EOMONTH(@DATE))
DECLARE @TAXES FLOAT = 0.2

DECLARE @TEMP TABLE (
    Id uniqueidentifier,
	LastName NVARCHAR(100),
	FirstName NVARCHAR(100),
	MiddleName NVARCHAR(100),
	CalculatedWage DECIMAL(38,15)
)

INSERT INTO @TEMP (Id, LastName, FirstName, MiddleName, CalculatedWage)
SELECT
	SickLeavesMonth.Id AS Id,
	SickLeavesMonth.LastName AS LastName,
	SickLeavesMonth.FirstName AS FirstName,
	SickLeavesMonth.MiddleName AS MiddleName,
	((SickLeavesMonth.Amount / @MDAYS * (@MDAYS - SickLeavesMonth.Days)) + (SickLeavesMonth.Amount / @MDAYS * SickLeavesMonth.Days * 0.5)) AS CalculatedWage
FROM (
	SELECT e.Id, e.LastName, e.FirstName, e.MiddleName, sl.StartDate, sl.EndDate,
		CASE 
			WHEN DATEPART(MONTH, sl.StartDate) < DATEPART(MONTH, @DATE)
				THEN DATEDIFF(DAY, CAST(CONCAT(DATEPART(YEAR,sl.StartDate), '-', DATEPART(MONTH, @DATE), '-01') AS DATE), sl.EndDate) + 1
			WHEN DATEPART(MONTH, sl.EndDate) > DATEPART(MONTH, @DATE)
				THEN DATEDIFF(DAY, sl.StartDate, EOMONTH(@DATE)) + 1
			ELSE DATEDIFF(DAY, StartDate, EndDate) + 1
		END AS [Days]
		,
		sa.Amount
	FROM Employees AS e
	JOIN SickLeaves AS sl
		ON sl.EmployeeId = e.Id
	JOIN Salaries AS sa
		ON sa.EmployeeId = e.Id
	WHERE (DATEPART(YEAR, sl.StartDate) = DATEPART(YEAR, @DATE) AND DATEPART(MONTH, sl.StartDate) = DATEPART(MONTH, @DATE)
		OR DATEPART(YEAR, sl.EndDate) = DATEPART(YEAR, @DATE) AND DATEPART(MONTH, sl.EndDate) = DATEPART(MONTH, @DATE))
			AND e.IsActive = 1
) AS SickLeavesMonth

SELECT Id, LastName, FirstName, MiddleName, CalculatedWage * (1 - @TAXES) AS Amount FROM @TEMP
UNION
SELECT e.Id, e.LastName, e.FirstName, e.MiddleName, sa.Amount * (1 - @TAXES) AS Amount FROM Employees AS e
JOIN Salaries AS sa
	ON sa.EmployeeId = e.Id
WHERE e.Id NOT IN (SELECT Id FROM @TEMP)