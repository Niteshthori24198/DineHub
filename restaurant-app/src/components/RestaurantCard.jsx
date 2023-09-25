import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WifiCalling3Icon from '@mui/icons-material/WifiCalling3';
import PersonIcon from '@mui/icons-material/Person';
import MailIcon from '@mui/icons-material/Mail';

import React from 'react'

const styylesCard = { display: 'flex', alignItems: 'center', marginBottom: '10px' }

function RestaurantCard({ restaurant, onClick, isSelected }) {
    return (
        <Card sx={{
            maxWidth: 300,
            backgroundColor: isSelected ? '#ffdeef' : 'white',
            border: isSelected ? '2px solid black' : 'none',
            cursor: 'pointer'
        }}
            onClick={onClick} >
            <CardMedia
                sx={{ height: 140 }}
                image={restaurant.image}
                title="green iguana"
            />
            <CardContent>

                <Typography gutterBottom variant="h6" component="div" style={{ display: 'flex', alignItems: 'center' }}>
                    <RestaurantIcon style={{ marginRight: '4px', fontWeight: 'bold', color: 'black' }} />
                    {restaurant.name}
                </Typography>

                <Typography variant="body1" color="text.secondary" style={styylesCard}>
                    <LocationOnIcon style={{ marginRight: '4px', fontWeight: 'bold', color: 'black' }} />
                    {restaurant.address}
                </Typography>
            
                <Typography variant="body1" color="text.secondary" style={styylesCard}>
                    <WifiCalling3Icon style={{ marginRight: '4px', fontWeight: 'bold', color: 'black' }} />
                    {restaurant.contact}
                </Typography>

                <Typography variant="body1" color="text.secondary" style={styylesCard}>
                    <PersonIcon style={{ marginRight: '4px', fontWeight: 'bold', color: 'black' }} />
                    {restaurant.User.name} 
                </Typography>

                <Typography variant="body1" color="text.secondary" style={{ display: 'flex', alignItems: 'center' }}>
                    <MailIcon style={{ marginRight: '4px', fontWeight: 'bold', color: 'black' }} />
                    {restaurant.User.email} 
                </Typography>

            </CardContent>
        </Card>
    )
}

export default RestaurantCard