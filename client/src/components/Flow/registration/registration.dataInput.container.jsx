import { connect } from 'react-redux'
import { emailVerification, signup } from '../../../redux/reducers/AuthReducer'
import RegistrationDataInput from './registration.dataInput'

const RegistrationDataInputContainer = ({
    setPage,
    errorMessage,
    isLoader,
    signup,
    emailVerification,
    setEmail,
}) => {
    return (
        <RegistrationDataInput
            signup={signup}
            isLoader={isLoader}
            emailVerification={emailVerification}
            errorMessage={errorMessage}
            setPage={setPage}
            setEmail={setEmail}
        />
    )
}

const maStateToProps = (state) => ({
    errorMessage: state.Auth.errorMessage,
    isLoader: state.Auth.isLoader,
})
export default connect(maStateToProps, { emailVerification, signup })(
    RegistrationDataInputContainer
)
