import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import { changeLoginStateAC, login } from "../redux/actions"
import { checkEmail, checkPassword } from "../utils/validate";

const Login = (props) => {

    const { loginState: loginStateProps } = props;

    const [logState, setLogState] = useState({
        email: loginStateProps.email,
        password: loginStateProps.password,
    })

    useEffect(() => {
        setLogState({
            email: loginStateProps.email,
            password: loginStateProps.password,
        })
    }, [loginStateProps])

    const onChangeLogin = (e) => {
        props.changeLogin({
            ...logState,
            [e.target.name]: e.target.value
        })
    }

    const [user, setUser] = useState(props.user)

    useEffect(() => {
        setUser(props.user)
    }, [props.user])

    const [validation, setValidation] = useState({
        email: "",
        password: "",
        error: ""
    })

    const onLogin = (e) => {
        e.preventDefault()
        
        setValidation({
            email: "",
            password: "",
            error: ""
        })

        const emailChecked = checkEmail(logState.email)
        if (!emailChecked) {
            setValidation(prev => ({
                ...prev,
                email: "is invalid"
            }))
        }

        const passChecked = checkPassword(logState.password)
        if (passChecked !== true) {
            setValidation(prev => ({
                ...prev,
                password: passChecked
            }))
        }

        if (emailChecked && passChecked) {
            if (logState.email === user.email &&
                logState.password === user.password) {
                props.login()
            } else {
                setValidation(prev => ({
                    ...prev,
                    error: "wrong email or password"
                }))
            }
        }


    }

    return (
        <div className="form-wrapper">
            <h1>LOGIN</h1>
            <form>
                <span className="validate-error">
                    {validation.error}
                </span>
                <div className="form__field">
                    <input
                        type="text"
                        name="email"
                        value={logState.email}
                        onChange={e => onChangeLogin(e)}
                        placeholder="email"
                    />
                    <span className="validate-error">
                        {validation.email}
                    </span>
                </div>
                <div className="form__field">
                    <input
                        type="password"
                        name="password"
                        value={logState.password}
                        onChange={e => onChangeLogin(e)}
                        placeholder="password"
                    />
                    <span className="validate-error">
                        {validation.password}
                    </span>
                </div>

                <button type="submit" onClick={e => onLogin(e)}>login</button>
            </form>
        </div>
    )
}

const mapStateToProps = (state) => ({
    loginState: state.inputsState.loginState,
    user: state.auth.user,
})

const mapDispatchToProps = (dispatch) => ({
    changeLogin: (loginState) => dispatch(changeLoginStateAC(loginState)),
    login: () => dispatch(login())
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)