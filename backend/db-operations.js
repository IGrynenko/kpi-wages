const config = require('./db-config');
const sql = require("mssql");

async function getEmployees() {

    try {
        const pool = await sql.connect(config);
        const employees = await pool.request()
            .query('select * from View_Employees_Info');
        
        return employees.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}

async function updateEmployee(emp) {

    const pool = await sql.connect(config);
    const positionsQuery = await pool.request()
        .query('select * from Position');
    const msQuery = await pool.request()
        .query('select * from MaritalStatus');
    
    if (positionsQuery.recordsets && msQuery.recordsets) {

        const positions = positionsQuery.recordsets[0];
        const position = positions.find(p => p.Title === emp.Position)

        const marStatuses = msQuery.recordsets[0];
        const ms = marStatuses.find(p => p.Title === emp.MaritalStatus)

        await pool.request()
            .input('pf', sql.Int, emp.PersonalFile)
            .input('LastName', sql.NVarChar, emp.LastName)
            .input('FirstName', sql.NVarChar, emp.FirstName)
            .input('MiddleName', sql.NVarChar, emp.MiddleName)
            .input('Position', sql.UniqueIdentifier, position.Id)
            .input('DateOfBirth', sql.Date, emp.DateOfBirth)
            .input('MaritalStatus', sql, ms.Id)
            .input('Children', sql.Int, emp.Children)
            .query('update Employee');
    }
}

async function getSalariesByMonth(date) {

    try {
        const pool = await sql.connect(config);
        const wages = await pool.request()
            .input('date', sql.Date, date)
            .execute('TotalWagesByMonth');
        
        return wages.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}

async function getEmployee(id) {

    try {
        const pool = await sql.connect(config);
        const employee = await pool.request()
            .input('id', sql.UniqueIdentifier(), id)
            .query('select * from Employees where Id = @id and IsActive = 1');
        
        return employee.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}

async function removeEmployee(id) {

    try {
        const pool = await sql.connect(config);
        const employee = await pool.request()
            .input('id', sql.UniqueIdentifier(), id)
            .query('update Employees set IsActive = 0 where Id = @id');
        
        return employee.rowsAffected[0] ? true : false;

    }
    catch (error) {
        console.log(error);
        return false;
    }
}

async function getSickLeaves(date) {

    try {
        const pool = await sql.connect(config);
        const sickLeaves = await pool.request()
            .input('date', sql.Date, date)
            .execute('SelectSickLeaves');

        return sickLeaves.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}

async function getOverallTransfers(date) {

    try {
        const pool = await sql.connect(config);
        const totals = await pool.request()
            .input('date', sql.Date, date)
            .execute('SelectTotalsComplete');

        return totals.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}

module.exports = {
    getSalariesByMonth: getSalariesByMonth,
    getSickLeaves: getSickLeaves,
    getOverallTransfers: getOverallTransfers,
    getEmployee: getEmployee,
    getEmployees: getEmployees,
    removeEmployee: removeEmployee
}