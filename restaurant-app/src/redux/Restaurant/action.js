import axios from 'axios';

import { ADD_RESTAURANT, DELETE_RESTAURANT, GET_RESTAURANT, RESTAURANT_ERROR, RESTAURANT_REQUEST, UPDATE_RESTAURANT } from "../ActionTypes/actionTypes"

const restaurantRequestAction = () => {
    return {
        type: RESTAURANT_REQUEST
    }
}

const restaurantErrorAction = (error) => {
    return {
        type: RESTAURANT_ERROR,
        payload: error
    }
}

const getRestaurantAction = (restaurant) => {
    return {
        type: GET_RESTAURANT,
        payload: restaurant
    }
}

const addRestaurantAction = (restaurant) => {
    return {
        type: ADD_RESTAURANT,
        payload: restaurant
    }
}

const updateRestaurantAction = (restaurant) => {
    return {
        type: UPDATE_RESTAURANT,
        payload: restaurant
    }
}

const deleteRestaurantAction = (restaurant) => {
    return {
        type: DELETE_RESTAURANT,
        payload: restaurant
    }
}


export const getRestaurant = (payload) => (dispatch) => {

    dispatch(restaurantRequestAction());

    return axios({
        method: 'GET',
        url: process.env.REACT_APP_BASE_URL,
        params: payload
    }).then((res) => {
        const totalCount = res.headers.get('X-Total-Count');

        dispatch(getRestaurantAction({ data: res.data, totalCount }));
    }).catch(err => {
        dispatch(restaurantErrorAction(err));
    })

}

export const postRestaurant = (payload) => (dispatch) => {

    dispatch(restaurantRequestAction());

    axios({
        method: 'POST',
        url: process.env.REACT_APP_BASE_URL,
        data: payload
    }).then((res) => {
        console.log(res);
        dispatch(addRestaurantAction(res.data));
    }).catch(err => {
        dispatch(restaurantErrorAction(err));
    })

}


export const updateRestaurant = (id, payload) => (dispatch) => {

    dispatch(restaurantRequestAction());

    axios({
        method: 'PUT',
        url: `${process.env.REACT_APP_BASE_URL}/${id}`,
        data: payload
    }).then((res) => {
        updateRestaurantAction({ id: id, ...payload });
    }).catch(err => {
        dispatch(restaurantErrorAction(err));
    })

}

export const deleteRestaurant = (id) => (dispatch) => {

    dispatch(restaurantRequestAction());

    axios({
        method: 'DELETE',
        url: `${process.env.REACT_APP_BASE_URL}/${id}`
    }).then((res) => {
        deleteRestaurantAction(id);
    }).catch(err => {
        dispatch(restaurantErrorAction(err));
    })

}
