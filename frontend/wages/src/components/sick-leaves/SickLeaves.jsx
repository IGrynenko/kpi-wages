import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { DatePicker } from "@material-ui/pickers";
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Spinner from '../../shared/spinner';

const SickLeaves = () => {

    const [date, setDate] = useState(new Date());
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);

    //! settings
    const handleDateChange = (e) => {
        fetch('http://localhost:3010/api/sick-leaves', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                date: e,
            })
        })
            .then(res => res.json())
            .then(
                res => {
                    setRows(res);
                    setDate(e);
                },
                error => {
                    console.log('ERROR: ' + error);
                }
            );
    };

    //! settings
    useEffect(() => {
        fetch('http://localhost:3010/api/sick-leaves', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                date: date,
            })
        })
            .then(res => res.json())
            .then(
                res => {
                    setLoading(false);
                    setRows(res);
                },
                error => {
                    console.log('ERROR: ' + error);
                    setLoading(false)
                }
            );
    }, []);

    const title = (
        <div className="content-title">
            <h2>Sick leaves by month</h2>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker
                    views={["year", "month"]}
                    label="Year and Month"
                    minDate={new Date("2018-01-01")}
                    maxDate={new Date()}
                    value={date}
                    onChange={handleDateChange}
                />
            </MuiPickersUtilsProvider>
        </div>
    );

    return (
        <div className="content-block">
            {title}
            { loading && <Spinner />}
            <TableContainer component={Paper}>
                <Table sx={{ maxWidth: 700 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Number</TableCell>
                            <TableCell align="right">LastName</TableCell>
                            <TableCell align="right">FirstName</TableCell>
                            <TableCell align="right">MiddleName</TableCell>
                            <TableCell align="right">Days</TableCell>							
                        </TableRow>
                    </TableHead>
                    {!loading && 
                        <TableBody>
                        {rows.map((row, index) => (
                            <TableRow
                            key={row.Id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">{index + 1}</TableCell>
                                <TableCell align="right">{row.LastName}</TableCell>
                                <TableCell align="right">{row.FirstName}</TableCell>
                                <TableCell align="right">{row.MiddleName}</TableCell>
                                <TableCell align="right">{row.Days}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    }
                </Table>
            </TableContainer>
        </div>
    );
};

export default SickLeaves;