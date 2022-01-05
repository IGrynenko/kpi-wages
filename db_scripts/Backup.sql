USE kpi_wages_db
GO
BACKUP DATABASE [kpi_wages_db]
TO  DISK = N'D:\db_backups\kpi_wages.bak'
WITH CHECKSUM;