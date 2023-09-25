import { ADD_RESTAURANT, DELETE_RESTAURANT, GET_RESTAURANT, RESTAURANT_ERROR, RESTAURANT_REQUEST, UPDATE_RESTAURANT } from "../ActionTypes/actionTypes"

const initialState = {
    restaurant: [],
    isLoading: false,
    isError: false,
    error: '',
    totalCount : 0
}

export const reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case RESTAURANT_REQUEST: {
            return {
                ...state,
                isLoading: true,
                isError: false,
                error: ''
            }
        }

        case RESTAURANT_ERROR: {
            return {
                ...state,
                isLoading: false,
                isError: true,
                error: payload
            }
        }

        case GET_RESTAURANT: {
            console.log("payload ==>", payload);
            return {
                ...state,
                isLoading: false,
                isError: false,
                error: '',
                restaurant: payload.data,
                totalCount: +payload.totalCount
            }
        }

        case ADD_RESTAURANT: {
            return {
                ...state,
                isLoading: false,
                isError: false,
                error: '',
                restaurant: [...state.restaurant, payload]
            }
        }

        case UPDATE_RESTAURANT: {
            return {
                ...state,
                isLoading: false,
                isError: false,
                error: '',
                restaurant: state.restaurant.map((item) => {
                    if (item.id !== payload.id) {
                        return item
                    }
                    return { ...item, ...payload }
                })
            }
        }

        case DELETE_RESTAURANT: {
            return {
                ...state,
                isLoading: false,
                isError: false,
                error: '',
                restaurant: state.restaurant.filter(item => item.id !== payload)
            }
        }


        default:
            return state
    }
}