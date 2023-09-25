import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../redux/User/action';



export default function UserSelect({ added_by, handleChange, restaurantId }) {

    const users = useSelector((state) => state.user.users);
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(getUser())
    }, [])


    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Added By</InputLabel>
                <Select
                    required
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={added_by}
                    label="Added By"
                    name='added_by'
                    onChange={handleChange}
                    disabled={restaurantId ? true : false}
                >
                    {
                        users.map((user) => {
                            return <MenuItem key={user.id} value={user.id}>{user.email}</MenuItem>
                        })
                    }
                </Select>
            </FormControl>
        </Box>
    );
}
