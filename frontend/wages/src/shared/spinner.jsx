import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Spinner = () => {
    return (
        <div className="spinner">
            <Box sx={{ display: 'flex' }}>
                <CircularProgress color="secondary" />
            </Box>
        </div>
    );
};

export default Spinner;