USE master;
CREATE LOGIN [Web] WITH PASSWORD = 'P@$$w0rd';
USE kpi_wages_db;
CREATE USER [Web] FOR LOGIN [Web];