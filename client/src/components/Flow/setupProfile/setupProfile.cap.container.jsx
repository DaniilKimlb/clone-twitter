import { connect } from 'react-redux'
import { changeCap } from '../../../redux/reducers/ProfileReducer'
import { Loader } from '../../Loader/Loader'
import UpdateCap from './setupProfile.cap'

const UpdateCapContainer = ({
    setPage,
    avatar,
    cap,
    name,
    username,
    changeCap,
    isLoader,
}) => {
    if (isLoader) {
        return <Loader />
    }
    return (
        <UpdateCap
            setPage={setPage}
            avatar={avatar}
            cap={cap}
            name={name}
            username={username}
            changeCap={changeCap}
        />
    )
}

const maStateToProps = (state) => ({
    userId: state.Auth.userId,
    avatar: state.Profile.avatar,
    cap: state.Profile.cap,
    name: state.Profile.name,
    username: state.Profile.username,
    isLoader: state.Auth.isLoader,
})
export default connect(maStateToProps, { changeCap })(UpdateCapContainer)
