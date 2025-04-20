import axios from "axios"
import { GET_USER_FAILURE, GET_USER_REQUEST, GET_USER_SUCCESS } from "./ActionType"
import url from "../../config/Config";

export const login = (user, navigate) => async (dispatch) => {
    dispatch({ type: GET_USER_REQUEST })
    try {
        console.log(user);
        
        const response = await axios.post(`${url}/api/User/login`, user)
        const { data } = response
        if(data){
            if(data.role === "Owner" || data.role === "Manager" || data.role === "Admin"){
                navigate("/admin/food?category=2&page=1")
            }
            else{
                navigate("/user")
            }
        }           
        localStorage.setItem("user", JSON.stringify(data))
        dispatch({ type: GET_USER_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: GET_USER_FAILURE, payload: "Error" })
    }
}