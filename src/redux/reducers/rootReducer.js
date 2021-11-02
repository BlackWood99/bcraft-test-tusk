import { combineReducers } from "redux";
import authReducer from "./authReducer";
import inputsStateReducer from "./inputsStateReducer";



const rootReducer = combineReducers({
    auth: authReducer,
    inputsState: inputsStateReducer,
})

export default rootReducer