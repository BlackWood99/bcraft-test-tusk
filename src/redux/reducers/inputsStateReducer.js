import { CHANGE_PASSWORD_STATE, LOGIN_STATE, REG_STATE } from "../constants"

const initialState = {
    regState: {
        email: "",
        password: "",
        confirmPassword: "",
    },
    loginState: {
        email: "",
        password: "",
    },
    changePassState: {
        oldPass: "",
        newPass: "",
        repeatPass: "",
    },
}

const inputsStateReducer = (state = initialState, action) => {
    switch (action.type) {
        case REG_STATE:
            return { ...state, regState: action.payload }
        case LOGIN_STATE:
            return { ...state, loginState: action.payload }
        case CHANGE_PASSWORD_STATE:
            return { ...state, changePassState: action.payload }
    
        default:
            return state
    }
}

export default inputsStateReducer