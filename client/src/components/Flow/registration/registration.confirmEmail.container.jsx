import { connect } from 'react-redux'
import { confirmEmail } from '../../../redux/reducers/AuthReducer'
import RegistrationConfirmEmail from './registration.confirmEmail'

const RegistrationConfirmEmailContainer = ({
    setPage,
    email,
    confirmEmail,
    errorMessage,
    isLoader,
}) => {
    return (
        <RegistrationConfirmEmail
            setPage={setPage}
            email={email}
            confirmEmail={confirmEmail}
            errorMessage={errorMessage}
            isLoader={isLoader}
        />
    )
}

const maStateToProps = (state) => ({
    errorMessage: state.Auth.errorMessage,
    isLoader: state.Auth.isLoader,
})
export default connect(maStateToProps, { confirmEmail })(
    RegistrationConfirmEmailContainer
)
