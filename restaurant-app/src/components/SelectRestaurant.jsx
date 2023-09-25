
import * as React from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import { useDispatch, useSelector } from 'react-redux';
import { getRestaurant } from '../redux/Restaurant/action';
import ShowRestaurant from './ShowRestaurant';


const getUniqueNames = (restaurants) => {
    let arr = new Set(restaurants.map((item) => item.name.toLowerCase()));
    return [...arr];
}

const finalSelectedValue = (restaurants, selectedValue) => {
    if (!selectedValue) return [];
    return restaurants.filter((item) => item.name.toLowerCase().includes(selectedValue.toLowerCase()));
}

const currentPageRestaurants = (restaurants, page, limit) => {
    return restaurants.slice((page - 1) * limit, page * limit);
}

export default function SelectRestaurant({ selectIdProps }) {

    const { handleSelectedRestaurentId } = selectIdProps


    const [inputValue, setInputValue] = React.useState('');
    const [selectedValue, setSelectedValue] = React.useState('');
    const [page, setPage] = React.useState(1);
    const [limit] = React.useState(9);


    const dispatch = useDispatch();
    const restaurants = useSelector((state) => state.restaurant.restaurant) || [];

    const allUnqueRestaurants = getUniqueNames(restaurants);
    const finalSelectedRestaurants = finalSelectedValue(restaurants, selectedValue);

    React.useEffect(() => {
        dispatch(getRestaurant());
    }, []);

    const filterOptions = (options, { inpValue }) => {
        return options.filter((option) =>
            option.toLowerCase().includes(inputValue.toLowerCase())
        );
    };

    const handleSelectRestaurantChange = (event, newValue) => {
        setSelectedValue(newValue);
        handleSelectedRestaurentId(null)
    }

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };



    return (
        <Stack sx={{ mt: 5, width: '100%'}}>
            <Autocomplete
                sx={{ width: { xs: '100%', md: '50%'}, margin: 'auto', mb: 5 }}
                id="Restaurant"
                freeSolo
                options={allUnqueRestaurants}
                filterOptions={filterOptions}
                value={selectedValue}
                onChange={handleSelectRestaurantChange}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Select Restaurant"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                )}
            />
            <ShowRestaurant
                sx={{ width: '100%', margin: 'auto' }}
                totalCount={finalSelectedRestaurants.length}
                restaurants={currentPageRestaurants(finalSelectedRestaurants, page, limit)}
                limit={limit}
                page={page}
                handlePageChange={handlePageChange}
                selectIdProps={selectIdProps}
            />
        </Stack>
    );
}





