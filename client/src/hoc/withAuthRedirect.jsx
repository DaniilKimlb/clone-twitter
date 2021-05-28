import { connect } from 'react-redux'
import { Redirect } from 'react-router'

const mapStateToProps = (state) => ({
    isAuth: state.Auth.isAuth,
})
const withAuthRedirect = (Component) => {
    const withAuthRedirect = ({ isAuth }) => {
        if (!isAuth) {
            return <Redirect to="/" />
        }
        return <Component />
    }
    return connect(mapStateToProps, {})(withAuthRedirect)
}

export default withAuthRedirect
