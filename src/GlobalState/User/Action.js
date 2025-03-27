import axios from "axios"
import { GET_USER_FAILURE, GET_USER_REQUEST, GET_USER_SUCCESS } from "./ActionType"

export const login = (user) => async (dispatch) => {
    dispatch({ type: GET_USER_REQUEST })
    try {
        const response = await axios.post("http://localhost:5248/api/User/login", user)
        const { data } = response
        localStorage.setItem("user", JSON.stringify(data))
        dispatch({ type: GET_USER_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: GET_USER_FAILURE, payload: "Error" })
    }
}