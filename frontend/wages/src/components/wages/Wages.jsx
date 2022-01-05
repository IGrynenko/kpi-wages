import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { formatedDate } from "../../shared/dateHelper";
import Spinner from '../../shared/spinner';
import EditIcon from '@mui/icons-material/Edit';

const Wages = () => {

    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);

    //! move path to settings
    useEffect(() => {
        fetch('http://localhost:3010/api/wages', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then(res => res.json())
            .then(
                res => {
                    setLoading(false);
                    setRows(res);
                },
                error => console.log('ERROR: ' + error)
            );
    }, []);

    const title = (
        <div className="content-title">
            <h2>Wages</h2>
        </div>
    );

    return (
        <div className="content-block">
            {title}
            { loading && <Spinner />}
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650, maxWidth: 1200 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Number</TableCell>
                            <TableCell align="right">PersonalFile</TableCell>
                            <TableCell align="right">LastName</TableCell>
                            <TableCell align="right">FirstName</TableCell>
                            <TableCell align="right">MiddleName</TableCell>
                            <TableCell align="right">Position</TableCell>
                            <TableCell align="right">Salary</TableCell>
                            <TableCell align="right">DateOfBirth</TableCell>
                            <TableCell align="right">MaritalStatus</TableCell>
                            <TableCell align="right">Children</TableCell>
                            <TableCell align="right">Edit</TableCell>	
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
                                <TableCell align="right">{row.PersonalFile}</TableCell>
                                <TableCell align="right">{row.LastName}</TableCell>
                                <TableCell align="right">{row.FirstName}</TableCell>
                                <TableCell align="right">{row.MiddleName}</TableCell>
                                <TableCell align="right">{row.Position}</TableCell>
                                <TableCell align="right">{row.Salary}</TableCell>
                                <TableCell align="right">{formatedDate(row.DateOfBirth)}</TableCell>
                                <TableCell align="right">{row.MaritalStatus}</TableCell>
                                <TableCell align="right">{row.Children}</TableCell>
                                <TableCell align="right"><EditIcon /></TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    }
                </Table>
            </TableContainer>
        </div>
    );
};

export default Wages;