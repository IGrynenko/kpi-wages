import React from 'react';
import { Button, Drawer } from "@mui/material";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MoneyIcon from '@mui/icons-material/Money';
import MasksIcon from '@mui/icons-material/Masks';
import FunctionsIcon from '@mui/icons-material/Functions';
import { Link } from "react-router-dom";

const Menu = () => {

    const [state, setState] = React.useState(false);

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
    
        setState(open);
    };

    return (
        <div>
            <Button variant="outlined" onClick={toggleDrawer(true)}>MENU</Button>
            <Drawer
                anchor="left"
                open={state}
                onClick={toggleDrawer(false)}
                onClose={toggleDrawer(false)}
            >
                <List>
                    <Link to="/wages">
                        <ListItem disablePadding>               
                            <ListItemButton>
                                <ListItemIcon>
                                    <MoneyIcon />
                                </ListItemIcon>
                            <ListItemText primary="Wages" />
                            </ListItemButton>
                        </ListItem>
                    </Link>
                    <Link to="/sick-leaves">
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <MasksIcon />
                                </ListItemIcon>
                                <ListItemText primary="Sick Leaves" />
                            </ListItemButton>
                        </ListItem>
                    </Link>
                    <Link to="/overall-transfers">
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <FunctionsIcon />
                                </ListItemIcon>
                                <ListItemText primary="Overall Transfers" />
                            </ListItemButton>
                        </ListItem>
                    </Link>
                </List> 
            </Drawer>
        </div>
    )
};

export default Menu;