import { connect } from 'react-redux'
import { checkTokenForReset } from '../../../redux/reducers/AuthReducer'
import ConfirmToken from './resetPassword.confirmToken'

const ConfirmTokenContainer = ({
    setPage,
    errorMessage,
    isLoader,
    email,
    checkTokenForReset,
}) => {
    return (
        <ConfirmToken
            setPage={setPage}
            checkTokenForReset={checkTokenForReset}
            email={email}
            isLoader={isLoader}
            errorMessage={errorMessage}
        />
    )
}

const maStateToProps = (state) => ({
    errorMessage: state.Auth.errorMessage,
    isLoader: state.Auth.isLoader,
})
export default connect(maStateToProps, { checkTokenForReset })(
    ConfirmTokenContainer
)
