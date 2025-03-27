import { GET_CATEGORY } from "./ActionType"

export const getCategory = (category)=>async(dispatch)=>{
    dispatch({categoryId: category, type: GET_CATEGORY})    
}