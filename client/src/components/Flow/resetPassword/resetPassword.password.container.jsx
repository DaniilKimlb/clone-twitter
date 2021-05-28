import { connect } from 'react-redux'
import { password } from '../../../redux/reducers/AuthReducer'
import Password from './resetPassword.password'

const PasswordContainer = ({
    setPage,
    errorMessage,
    isLoader,
    email,
    password,
    resetToken,
    setIsChangePasswordComplete,
}) => {
    return (
        <Password
            email={email}
            isLoader={isLoader}
            errorMessage={errorMessage}
            setPage={setPage}
            resetToken={resetToken}
            password={password}
            setIsChangePasswordComplete={setIsChangePasswordComplete}
        />
    )
}

const maStateToProps = (state) => ({
    errorMessage: state.Auth.errorMessage,
    isLoader: state.Auth.isLoader,
    resetToken: state.Auth.resetToken,
})
export default connect(maStateToProps, { password })(PasswordContainer)
