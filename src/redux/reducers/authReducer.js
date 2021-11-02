import { CHANGE_PASSWORD_SUCCESS, LOGIN_SUCCESS, REGISTRATION_SUCCESS, SET_ERROR, SET_SERVER_MESS } from "../constants"


const initialState = {
    user: {
        email: "",
        password: "",
    },
    isAuth: false,
    serverMess: "",
    error: null,
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return { 
                ...state, 
                isAuth: true,
                serverMess: "login completed successfully",
                error: null,
            }
        case REGISTRATION_SUCCESS:
            return { 
                ...state, 
                user: {
                    email: action.payload.email,
                    password: action.payload.password,
                },
                serverMess: "registration completed successfully",
                error: null,
            }
        case CHANGE_PASSWORD_SUCCESS:
            return { 
                ...state,
                user: {
                    ...state.user,
                    password: action.payload.password,
                },
                serverMess: "password changed successfully",
                error: null,
            }
        case SET_ERROR:
            return {
                ...state,
                error: action.payload
            }
        case SET_SERVER_MESS:
            return {
                ...state,
                serverMess: action.payload
            }
        default:
            return state
    }
}

export default authReducer