const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
const app = express();
const router = express.Router();
const dbOperations = require('./db-operations');
const jsonParser = bodyParser.json()

//* update
app.use(cors());

app.use('/api', router);

router.get('/employees', async (req, res) => {

    const records = await dbOperations.getEmployees();

    res.send(records[0]);
});

router.post('/sick-leaves', jsonParser, async (req, res) => {

    if (!req.body)
        return res.sendStatus(400);

    const date = req.body.date;

    if (!date)
        res.status(400)
            .json({ status: 400, message: "Date is requited"})

    const records = await dbOperations.getSickLeaves(date);

    res.send(records[0]);
});

router.post('/wages', jsonParser, async (req, res) => {

    if (!req.body)
        return res.sendStatus(400);

    const date = req.body.date;

    if (!date)
        res.status(400)
            .json({ status: 400, message: "Date is requited"})

    const records = await dbOperations.getSalariesByMonth(date);
    
    res.send(records[0]);
});

router.post('/overall-transfers', jsonParser, async (req, res) => {

    if (!req.body)
        return res.sendStatus(400);

    const date = req.body.date;

    if (!date)
        res.status(400)
            .json({ status: 400, message: "Date is requited"})

    const records = await dbOperations.getOverallTransfers(date);

    res.send(records[0]);
});

router.delete('/employee', async (req, res) => {

    const id = req.query.id;

    if (!id) {
        res.status(400)
            .json({ status: 400, message: "No valid id"})
    }

    const employees = await dbOperations.getEmployee(id);

    if (employees.length === 0) {
        res.status(404)
            .json({ status: 400, message: "Such id doesn't exist"})
    }

    const result = await dbOperations.removeEmployee(id);

    if (!result) {
        res.status(500);
    }

    res.status(200)
            .json({ status: 200, message: `${id} was deleted`})
});

//! port in settings
app.listen(3010, () => console.log('Server ready'));