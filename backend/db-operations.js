const config = require('./db-config');
const sql = require("mssql");

async function getSalariesByMonth() {

    try {
        const pool = await sql.connect(config);
        const wages = await pool.request()
            .query('select * from View_Employees_Info');
        
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
            .execute('SelectTotals');

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
    removeEmployee: removeEmployee
}