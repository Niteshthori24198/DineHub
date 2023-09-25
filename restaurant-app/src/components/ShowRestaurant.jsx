import { Box, Grid, Pagination, Stack } from '@mui/material'
import React from 'react'
import RestaurantCard from './RestaurantCard'

function ShowRestaurant({ totalCount, restaurants, limit, page, handlePageChange, selectIdProps={} }) {
    const { selectedRestaurentId, handleSelectedRestaurentId } = selectIdProps;

    if (!totalCount) {
        return <></>
    }

    const handleClickonCard = (id) => {
        if (typeof handleSelectedRestaurentId == 'function') {
            handleSelectedRestaurentId(id);
        }
    }

    return (
        <>
            <Box
                sx={{
                    width: '80%',
                    margin: 'auto'
                }}
            >
                    <Grid
                        sx={{
                            display: 'grid',
                            alignItems: 'center',
                            placeItems: 'center',
                            justifyContent: 'center',
                            gridTemplateColumns: "repeat(auto-fill, 300px)",
                            gap: 5
                        }}
                    >
                        {restaurants?.map((restaurant, index) => (

                            <Grid item xs={2} sm={4} md={4} key={index} style={{ width:'100%' }}>

                                <RestaurantCard
                                    restaurant={restaurant}
                                    onClick={() => handleClickonCard(restaurant.id)}
                                    isSelected={(+selectedRestaurentId) === (+restaurant.id)}
                                />

                            </Grid>

                        ))}
                    </Grid>

            </Box>
            <Stack
                spacing={2}
                justifyContent="center"
                alignItems="center"
                sx={{ mb: 4, my:5 }}
            >
                <Pagination count={Math.ceil(totalCount / limit)} page={page} onChange={handlePageChange} color="primary" />
            </Stack>
        </>
    )
}

export default ShowRestaurant