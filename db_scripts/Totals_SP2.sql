CREATE PROCEDURE SelectTotalsComplete @DATE DATE
AS

DECLARE @MDAYS INT =  DAY(EOMONTH(@DATE))

DECLARE @TEMP TABLE (
    Id uniqueidentifier,
	CalculatedWage DECIMAL(38,15)
)

INSERT INTO @TEMP (Id, CalculatedWage)
SELECT SickLeavesMonth.Id AS Id, ((SickLeavesMonth.Amount / @MDAYS * (@MDAYS - SickLeavesMonth.Days)) + (SickLeavesMonth.Amount / @MDAYS * SickLeavesMonth.Days * 0.5)) AS CalculatedWage
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

SELECT * FROM (
	SELECT SUM(Wages.CalculatedWage) AS Wages FROM (
		SELECT Id, CalculatedWage FROM @TEMP
		UNION
		SELECT e.Id, sa.Amount FROM Employees AS e
		JOIN Salaries AS sa
			ON sa.EmployeeId = e.Id
		WHERE e.Id NOT IN (SELECT Id FROM @TEMP)
			AND e.IsActive = 1
	) AS Wages
) AS w
CROSS JOIN
(SELECT SUM(Amount) AS TotalAllowance FROM Allowance
WHERE DATEPART(YEAR, [Period]) = DATEPART(YEAR, @DATE)
	AND DATEPART(MONTH, [Period]) = DATEPART(MONTH, @DATE)) AS a
CROSS JOIN
(SELECT SUM(Amount) AS TotalBonuses FROM Bonuses
WHERE DATEPART(YEAR, [Period]) = DATEPART(YEAR, @DATE)
	AND DATEPART(MONTH, [Period]) = DATEPART(MONTH, @DATE)) AS b