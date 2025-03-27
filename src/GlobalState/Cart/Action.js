import { ADD_ITEM_TO_CART, DELETE_ITEM_TO_CART, RESET_CART } from "./ActionType"

export const addItemToCart = (item)=>(dispatch)=>{
    dispatch({type: ADD_ITEM_TO_CART, payload: item})
}

export const deleteItemToCart = (index)=>(dispatch)=>{
    dispatch({type: DELETE_ITEM_TO_CART, payload: index})
}

export const resetCart = ()=>(dispatch)=>{
    dispatch({type: RESET_CART})
}