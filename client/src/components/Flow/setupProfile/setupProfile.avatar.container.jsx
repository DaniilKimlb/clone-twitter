import { useEffect } from 'react'
import { connect } from 'react-redux'
import {
    changeAvatar,
    getProfile,
} from '../../../redux/reducers/ProfileReducer'
import { Loader } from '../../Loader/Loader'
import UpdateAvatar from './setupProfile.avatar'

const UpdateAvatarContainer = ({
    setPage,
    isLoader,
    avatar,
    getProfile,
    userId,
    changeAvatar,
}) => {
    useEffect(() => {
        if (userId) {
            getProfile(userId)
        }
    }, [getProfile, userId])
    if (isLoader) {
        return <Loader />
    }
    return (
        <UpdateAvatar
            setPage={setPage}
            avatar={avatar}
            changeAvatar={changeAvatar}
        />
    )
}

const maStateToProps = (state) => ({
    isLoader: state.Auth.isLoader,
    userId: state.Auth.userId,
    avatar: state.Profile.avatar,
})
export default connect(maStateToProps, { getProfile, changeAvatar })(
    UpdateAvatarContainer
)
