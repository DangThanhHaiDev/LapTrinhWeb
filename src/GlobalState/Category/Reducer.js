import { GET_CATEGORY } from "./ActionType"

const initialState = {
    category: ""
}

export const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CATEGORY:
            return {
                ...state,
                category: action.categoryId
            }
        default: return state
    }
}