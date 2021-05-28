import { connect } from 'react-redux'
import { changeAboutMe } from '../../../redux/reducers/ProfileReducer'
import { Loader } from '../../Loader/Loader'
import UpdateAboutMe from './setupProfile.aboutme'

const UpdateAboutMeContainer = ({
    setPage,
    changeAboutMe,
    aboutMe,
    isLoader,
    setIsChangeSetupPasswordComplete,
}) => {
    if (isLoader) {
        return <Loader />
    }
    return (
        <UpdateAboutMe
            setIsChangeSetupPasswordComplete={setIsChangeSetupPasswordComplete}
            setPage={setPage}
            aboutMe={aboutMe}
            changeAboutMe={changeAboutMe}
        />
    )
}

const maStateToProps = (state) => ({
    aboutMe: state.Profile.aboutMe,
    isLoader: state.Auth.isLoader,
})
export default connect(maStateToProps, { changeAboutMe })(
    UpdateAboutMeContainer
)
