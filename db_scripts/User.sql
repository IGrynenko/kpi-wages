USE master;
CREATE LOGIN [Node_user] WITH PASSWORD = 'P@$$w0rd';
USE kpi_wages_db;
CREATE USER [Node_user] FOR LOGIN [Node_user];