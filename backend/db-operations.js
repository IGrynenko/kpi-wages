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
    getOverallTransfers: getOverallTransfers
}