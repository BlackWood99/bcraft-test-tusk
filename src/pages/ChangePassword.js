import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import { changePassStateAC, changePassword } from "../redux/actions"
import { checkPassword } from "../utils/validate";


const ChangePassword = (props) => {

    const { changePassState: changePassStateProps } = props;

    const [changePassState, setChangePassState] = useState({
        oldPass: changePassStateProps.oldPass,
        newPass: changePassStateProps.newPass,
        repeatPass: changePassStateProps.repeatPass,
    })

    useEffect(() => {
        setChangePassState({
            oldPass: changePassStateProps.oldPass,
            newPass: changePassStateProps.newPass,
            repeatPass: changePassStateProps.repeatPass,
        })
    }, [changePassStateProps])

    const onChangeLogin = (e) => {
        props.onChangePassState({
            ...changePassState,
            [e.target.name]: e.target.value
        })
    }

    const [user, setUser] = useState(props.user)

    useEffect(() => setUser(props.user), [props.user])

    const [validation, setValidation] = useState({
        oldPass: "",
        newPass: "",
        repeatPass: ""
    })

    const changePassword = (e) => {
        e.preventDefault()

        setValidation({
            oldPass: "",
            newPass: "",
            repeatPass: ""
        })

        const oldPassChecked = user.password === changePassState.oldPass
        if (!oldPassChecked) {
            setValidation(prev => ({
                ...prev,
                oldPass: "is invalid"
            }))
        }

        const newPassChecked = checkPassword(changePassState.newPass)
        if (newPassChecked !== true) {
            setValidation(prev => ({
                ...prev,
                newPass: newPassChecked
            }))
        }

        const confirmChecked = changePassState.newPass === changePassState.repeatPass
        if (!confirmChecked) {
            setValidation(prev => ({
                ...prev,
                repeatPass: "passwords must match"
            }))
        }

        if (oldPassChecked && (newPassChecked === true) && confirmChecked) {
            props.changePassword({ password: changePassState.newPass })
            setChangePassState({
                oldPass: "",
                newPass: "",
                repeatPass: ""
            })
        }

    }

    return (
        <div className="login">
            <h1>CHANGE PASSWORD</h1>
            <form>
                <div className="form__field">
                    <input
                        type="password"
                        name="oldPass"
                        value={changePassState.oldPass}
                        onChange={e => onChangeLogin(e)}
                        placeholder="old password"
                    />
                    <span className="validate-error">
                        {validation.oldPass}
                    </span>
                </div>
                <div className="form__field">
                    <input
                        type="password"
                        name="newPass"
                        value={changePassState.newPass}
                        onChange={e => onChangeLogin(e)}
                        placeholder="new password"
                    />
                    <span className="validate-error">
                        {validation.newPass}
                    </span>
                </div>
                <div className="form__field">
                    <input
                        type="password"
                        name="repeatPass"
                        value={changePassState.repeatPass}
                        onChange={e => onChangeLogin(e)}
                        placeholder="repeat password"
                    />
                    <span className="validate-error">
                        {validation.repeatPass}
                    </span>
                </div>

                <button type="submit" onClick={e => changePassword(e)}>Change</button>
            </form>
        </div>
    )
}

const mapStateToProps = (state) => ({
    changePassState: state.inputsState.changePassState,
    user: state.auth.user,
})

const mapDispatchToProps = (dispatch) => ({
    onChangePassState: (passState) => dispatch(changePassStateAC(passState)),
    changePassword: (password) => dispatch(changePassword(password))
})

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword)