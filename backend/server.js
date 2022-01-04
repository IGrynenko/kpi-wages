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

router.use('/wages', async (req, res) => {

    let records = await dbOperations.getSalariesByMonth();

    res.send(records[0]);
});

router.post('/sick-leaves', jsonParser, async (req, res) => {

    if (!req.body)
        return res.sendStatus(400);

    const date = req.body.date;

    let records = await dbOperations.getSickLeaves(date);

    res.send(records[0]);
});

router.post('/overall-transfers', jsonParser, async (req, res) => {

    if (!req.body)
        return res.sendStatus(400);

    const date = req.body.date;

    let records = await dbOperations.getOverallTransfers(date);

    res.send(records[0]);
});

//! port in settings
app.listen(3010, () => console.log('Server ready'));