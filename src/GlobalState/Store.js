import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { thunk } from "redux-thunk";
import { LoginReducer } from "./User/Reducer";
import { categoryReducer } from "./Category/Reducer";
import { cartReducer } from "./Cart/Reducer";

const rootReducer = combineReducers(
    {
        userReducer: LoginReducer,
        categoryReducer: categoryReducer,
        cartReducer: cartReducer
    }
)

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))