import { ADD_USER, GET_USER, USER_ERROR, USER_REQUEST } from "../ActionTypes/actionTypes"

const initialState = {
    users: [],
    isLoading: false,
    isError: false,
    error: '',
    totalCount : 0
}

export const reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case USER_REQUEST: {
            return {
                ...state,
                isLoading: true,
                isError: false,
                error: ''
            }
        }

        case USER_ERROR: {
            return {
                ...state,
                isLoading: false,
                isError: true,
                error: payload
            }
        }

        case GET_USER: {
            
            return {
                ...state,
                isLoading: false,
                isError: false,
                error: '',
                users: payload.data,
                totalCount: +payload.totalCount
            }
        }

        case ADD_USER: {
            return {
                ...state,
                isLoading: false,
                isError: false,
                error: '',
                users: [...state.users, payload]
            }
        }

        default:
            return state
    }
}