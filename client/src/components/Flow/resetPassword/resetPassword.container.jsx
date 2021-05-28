import { connect } from 'react-redux'
import { resetPassword } from '../../../redux/reducers/AuthReducer'
import ResetPassword from './resetPassword'

const ResetPasswordContainer = ({
    setPage,
    errorMessage,
    isLoader,
    setEmail,
    resetPassword,
}) => {
    return (
        <ResetPassword
            setEmail={setEmail}
            resetPassword={resetPassword}
            isLoader={isLoader}
            errorMessage={errorMessage}
            setPage={setPage}
        />
    )
}

const maStateToProps = (state) => ({
    errorMessage: state.Auth.errorMessage,
    isLoader: state.Auth.isLoader,
})
export default connect(maStateToProps, { resetPassword })(
    ResetPasswordContainer
)
