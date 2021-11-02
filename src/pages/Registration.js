import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import { useHistory } from "react-router";
import { changeRegStateAC, registration } from "../redux/actions"
import { LOGIN_ROUTE } from "../utils/routeConsts";
import { checkEmail, checkPassword } from "../utils/validate";

const Registration = (props) => {
    const history = useHistory()

    const { regState: regStateProps } = props;

    const [regState, setRegState] = useState({
        email: regStateProps.email,
        password: regStateProps.password,
        confirmPassword: regStateProps.confirmPassword,
    })

    useEffect(() => {
        setRegState({
            email: regStateProps.email,
            password: regStateProps.password,
            confirmPassword: regStateProps.confirmPassword,
        })
    }, [regStateProps])

    const onChangeRegState = (e) => {
        props.changeReg({
            ...regState,
            [e.target.name]: e.target.value
        })
    }

    const [validation, setValidation] = useState({
        email: "",
        password: "",
        confirmPassword: ""
    })

    const onSignUp = (e) => {
        e.preventDefault()

        setValidation({
            email: "",
            password: "",
            error: ""
        })

        const emailChecked = checkEmail(regState.email)
        if (!emailChecked) {
            setValidation(prev => ({
                ...prev,
                email: "is invalid"
            }))
        }

        const passChecked = checkPassword(regState.password)
        if (passChecked !== true) {
            setValidation(prev => ({
                ...prev,
                password: passChecked
            }))
        }

        const confirmChecked = regState.password === regState.confirmPassword
        if (!confirmChecked) {
            setValidation(prev => ({
                ...prev,
                confirmPassword: "passwords must match"
            }))
        }

        if (emailChecked && passChecked && confirmChecked) {

            props.registration({
                email: regState.email,
                password: regState.password,
                confirmPassword: regState.confirmPassword,
            })

            props.changeReg({
                email: "",
                password: "",
                confirmPassword: "",
            })

            history.push(LOGIN_ROUTE)
        }
    }

    return (
        <div className="form-wrapper">
            <h1>REGISTRATION</h1>

            <form className="form">
                <div className="form__field">
                    <input
                        type="email"
                        name="email"
                        value={regState.email}
                        onChange={e => onChangeRegState(e)}
                        placeholder="email"
                    />
                    <span className="validate-error">{validation.email}</span>
                </div>
                <div className="form__field">
                    <input
                        type="password"
                        name="password"
                        value={regState.password}
                        onChange={e => onChangeRegState(e)}
                        placeholder="password"
                    />
                    <span className="validate-error">{validation.password}</span>
                </div>
                <div className="form__field">
                    <input
                        type="password"
                        name="confirmPassword"
                        value={regState.confirmPassword}
                        onChange={e => onChangeRegState(e)}
                        placeholder="repeat password"
                    />
                    <span className="validate-error">
                        {validation.confirmPassword}
                    </span>
                </div>
                <button type="submit" onClick={e => onSignUp(e)}>Sign Up</button>
            </form>
        </div>
    )
}

const mapStateToProps = (state) => ({
    regState: state.inputsState.regState
})

const mapDispatchToProps = (dispatch) => ({
    changeReg: (regState) => dispatch(changeRegStateAC(regState)),
    registration: (data) => dispatch(registration(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(Registration)