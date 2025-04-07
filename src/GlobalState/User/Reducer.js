import { GET_USER_FAILURE, GET_USER_REQUEST, GET_USER_SUCCESS } from "./ActionType"

const initialState = {
    user: null,
    error: null,
    isLoading: false,
}

export const LoginReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USER_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null,
            }
        case GET_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                user: action.payload
            }
        case GET_USER_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
                user: null
            }
        default:
            return state
    }
}