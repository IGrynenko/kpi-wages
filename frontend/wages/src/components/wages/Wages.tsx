import { FormEvent, useEffect, useState } from 'react';
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
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Employee } from '../../models/Employee';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { guid } from '../../shared/guid';

const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    height: 'fit-content',
    bgcolor: 'background.paper',
};

const Wages = () => {

    const [rows, setRows] = useState<Employee[]>([]);
    const [loading, setLoading] = useState(true);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [employeeOnEdit, setEmployeeOnEdit] = useState<Employee | null>(null);

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
        .then(res => {
                setLoading(false);
                setRows(res);
            },
            error => console.log('ERROR: ' + error)
        );
    }, []);

    const deleteEmployee = (id: guid) => {
        fetch('http://localhost:3010/api/employee' + `?id=${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
        .then((res) => {
            if (res.status === 200) {
                const filteredRows = rows.filter(emp => emp.Id != id);
                setRows(filteredRows);
            }
        }).catch(err => {
            console.error(err)
        });
    }

    const title = (
        <div className="content-title">
            <h2>Wages</h2>
        </div>
    );

    const handleOpen = (employee: Employee): void => {
        console.log(employee);
        setEmployeeOnEdit(employee);
        setOpenEditModal(true);
    };

    const handleClose = () => {
        setOpenEditModal(false);
        setEmployeeOnEdit(null);
    };
    
    const handleSubmit = (event: any) => {
        event.preventDefault()

        //! send request
        //! update existing if successful

        setEmployeeOnEdit(null);
        setOpenEditModal(false);
    };

    return (
        <div className="content-block">
            {title}
            { loading && <Spinner />}
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650, maxWidth: 1200 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Number</TableCell>
                            <TableCell align="center">Personal File</TableCell>
                            <TableCell align="center">Last Name</TableCell>
                            <TableCell align="center">First Name</TableCell>
                            <TableCell align="center">Middle Name</TableCell>
                            <TableCell align="center">Position</TableCell>
                            <TableCell align="center">Salary</TableCell>
                            <TableCell align="center">Date Of Birth</TableCell>
                            <TableCell align="center">Marital Status</TableCell>
                            <TableCell align="center">Children</TableCell>
                            <TableCell align="center">Edit</TableCell>
                            <TableCell align="center">Remove</TableCell>
                        </TableRow>
                    </TableHead>
                    {!loading && 
                        <TableBody>
                        {rows && rows.map((row, index) => (
                            <TableRow
                                key={row.Id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row" align="center">{index + 1}</TableCell>
                                <TableCell align="center">{row.PersonalFile}</TableCell>
                                <TableCell align="center">{row.LastName}</TableCell>
                                <TableCell align="center">{row.FirstName}</TableCell>
                                <TableCell align="center">{row.MiddleName}</TableCell>
                                <TableCell align="center">{row.Position}</TableCell>
                                <TableCell align="center">{row.Salary}</TableCell>
                                <TableCell align="center">{formatedDate(row.DateOfBirth)}</TableCell>
                                <TableCell align="center">{row.MaritalStatus}</TableCell>
                                <TableCell align="center">{row.Children}</TableCell>
                                <TableCell align="center">
                                    <div onClick={() => handleOpen(row)}>
                                        <EditIcon />
                                    </div>
                                </TableCell>
                                <TableCell align="center">
                                    <div onClick={() => deleteEmployee(row.Id)}>
                                        <DeleteIcon />
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    }
                </Table>
            </TableContainer>
            <Modal
                open={openEditModal}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyle}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" style={{margin: "20px 20px 0px 20px"}}>
                        Edit employee
                    </Typography>
                    <div className='form-content'>
                        <form className='edit-modal-form'>    
                            <TextField id="standard-basic" label="Personal File" variant="standard"
                                value={employeeOnEdit?.PersonalFile} />
                            <TextField id="standard-basic" label="Last Name" variant="standard"
                                value={employeeOnEdit?.LastName} />
                            <TextField id="standard-basic" label="First Name" variant="standard"
                                value={employeeOnEdit?.FirstName} />
                            <TextField id="standard-basic" label="Middle Name" variant="standard"
                                value={employeeOnEdit?.MiddleName} />
                            <TextField id="standard-basic" label="Position" variant="standard"
                                value={employeeOnEdit?.Position} />
                            <TextField id="standard-basic" label="Salary" variant="standard"
                                value={employeeOnEdit?.Salary} />
                            <TextField id="standard-basic" label="Date Of Birth" variant="standard"
                                value={employeeOnEdit?.DateOfBirth} />
                            <FormControl fullWidth variant="standard">
                                <InputLabel id="marital-status">Marital Status</InputLabel>
                                <Select
                                    labelId="marital-status"
                                    value={getMaritalStatus(employeeOnEdit?.MaritalStatus ?? '')}
                                    label="Marital Status"
                                    onChange={() => console.log(123)}
                                >
                                <MenuItem value={10}>Separated</MenuItem>
                                <MenuItem value={20}>Widowed</MenuItem>
                                <MenuItem value={30}>Divorced</MenuItem>
                                <MenuItem value={40}>Married</MenuItem>
                                <MenuItem value={50}>Single</MenuItem>
                                </Select>
                            </FormControl>
                            <TextField id="standard-basic" label="Children" variant="standard"
                                value={employeeOnEdit?.Children} />
                            <Button style={{marginTop: "10px"}} variant="contained" onClick={handleSubmit}>Submit</Button>
                        </form>
                    </div>
                </Box>
            </Modal>
        </div>
    );
};

function getMaritalStatus(status: string): number {

    let value;

    switch (status) {
        case 'Separated':
            value = 10;
            break;
        case 'Widowed':
            value = 20;
            break;
        case 'Divorced':
            value = 30;
            break;
        case 'Married':
            value = 40;
            break;
        default:
            value = 50;
            break;
    }

    return value;
}

export default Wages;