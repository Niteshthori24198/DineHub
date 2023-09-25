import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Restaurant from '../pages/Restaurant'
import AddRestaurant from '../pages/AddRestaurant'
import EditRestaurant from '../pages/EditRestaurant'
import AddUser from '../pages/AddUser'

function AllRouters() {
    return (
        <>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/Home' element={<Home />} />
                <Route path='/restaurant' element={<Restaurant />} />
                <Route path='/add-restaurant' element={<AddRestaurant />} />
                <Route path='/edit-restaurant' element={<EditRestaurant />} />
                <Route path='/add-user' element={<AddUser />} />
            </Routes>
        </>
    )
}

export default AllRouters