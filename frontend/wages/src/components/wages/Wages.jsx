import { Employee } from "../../models/Employee";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { testEmpoyees } from "../../requests/test";
import { formatedDate } from "../../shared/dateHelper";

const Wages = () => {

    const rows = testEmpoyees;

    return (
        <div className="content-block">
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
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows.map((row, index) => (
                        <TableRow
                        key={row.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">{index + 1}</TableCell>
                            <TableCell align="right">{row.personalFile}</TableCell>
                            <TableCell align="right">{row.lastName}</TableCell>
                            <TableCell align="right">{row.firstName}</TableCell>
                            <TableCell align="right">{row.middleName}</TableCell>
                            <TableCell align="right">{row.position}</TableCell>
                            <TableCell align="right">{row.salary}</TableCell>
                            <TableCell align="right">{formatedDate(row.dateOfBirth)}</TableCell>
                            <TableCell align="right">{row.maritalStatus}</TableCell>
                            <TableCell align="right">{row.children}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default Wages;