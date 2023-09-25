import axios from 'axios';

import { ADD_USER, GET_USER, USER_ERROR, USER_REQUEST } from "../ActionTypes/actionTypes"

const userRequestAction = () => {
    return {
        type: USER_REQUEST
    }
}

const userErrorAction = (error) => {
    return {
        type: USER_ERROR,
        payload: error
    }
}

const getUserAction = (user) => {
    return {
        type: GET_USER,
        payload: user
    }
}

const addUserAction = (user) => {
    return {
        type: ADD_USER,
        payload: user
    }
}





export const getUser = (payload) => (dispatch) => {

    dispatch(userRequestAction());

    return axios({
        method: 'GET',
        url: process.env.REACT_APP_BASE_URL_USER,
        params: payload
    }).then((res) => {
        const totalCount = res.headers.get('X-Total-Count');

        dispatch(getUserAction({ data: res.data, totalCount }));
    }).catch(err => {
        dispatch(userErrorAction(err));
    })

}

export const postUser = (payload) => (dispatch) => {

    dispatch(userRequestAction());

    axios({
        method: 'POST',
        url: process.env.REACT_APP_BASE_URL_USER,
        data: payload
    }).then((res) => {
        console.log(res);
        dispatch(addUserAction(res.data));
    }).catch(err => {
        dispatch(userErrorAction(err));
    })

}
