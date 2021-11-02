import { 
    LOGIN_SUCCESS,
    REGISTRATION_SUCCESS,
    CHANGE_PASSWORD_SUCCESS,
    SET_ERROR,
    SET_SERVER_MESS,
    REG_STATE,
    LOGIN_STATE,
    CHANGE_PASSWORD_STATE,
} from "../constants";


export const loginSuccessAC = () => ({
    type: LOGIN_SUCCESS,
})

export const registrationSuccessAC = (email, password) => ({
    type: REGISTRATION_SUCCESS,
    payload: { email, password },
})

export const changePasswordSuccessAC = (password) => ({
    type: CHANGE_PASSWORD_SUCCESS,
    payload: { password },
})

export const setErrorAC = (error) => ({
    type: SET_ERROR,
    payload: error,
})

export const setServerMessAC = (serverMess) => ({
    type: SET_SERVER_MESS,
    payload: serverMess,
})



export const login = () => (dispatch) => {
    const error = null
    if (error) {
        dispatch(setErrorAC(error))
        console.log("failed to login: ", error)
    }

    dispatch(loginSuccessAC())

    setTimeout(() => {
        dispatch(setServerMessAC(""))
    }, 2000)
}

export const registration = ({ email, password, error }) => (dispatch) => {
    if (error) {
        dispatch(setErrorAC(error))
        console.log("failed to registration: ", error)
    }

    dispatch(registrationSuccessAC(email, password))

    setTimeout(() => {
        dispatch(setServerMessAC(""))
    }, 2000)
}

export const changePassword = ({ password, error }) => (dispatch) => {
    if (error) {
        dispatch(setErrorAC(error))
        console.log("failed to change password: ", error)
    }

    dispatch(changePasswordSuccessAC(password))

    setTimeout(() => {
        dispatch(setServerMessAC(""))
    }, 2000)
}



// INPUTS STATE

export const changeRegStateAC = (regState) => {
    return {
        type: REG_STATE,
        payload: regState,
    }
}
export const changeLoginStateAC = (loginState) => {
    return {
        type: LOGIN_STATE,
        payload: loginState,
    }
}
export const changePassStateAC = (passState) => {
    return {
        type: CHANGE_PASSWORD_STATE,
        payload: passState,
    }
}