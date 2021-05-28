import { profile } from '../../API/API'
import { setLoader } from './AuthReducer'

const SET_PROFILE = 'profile/GET_PROFILE'
const CHANGE_AVATAR = 'profile/CHANGE_AVATAR'
const CHANGE_CAP = 'profile/CHANGE_CAP'
const CHANGE_ABOUT_ME = 'profile/CHANGE_ABOUT_ME'
const initialState = {
    username: null,
    name: null,
    avatar: null,
    cap: null,
    aboutMe: null,
}

const ProfileReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PROFILE:
            return {
                ...state,
                username: action.data.username,
                name: action.data.name,
                avatar: action.data.avatar,
                cap: action.data.cap,
            }
        case CHANGE_AVATAR:
            return {
                ...state,
                avatar: action.data,
            }
        case CHANGE_CAP:
            return {
                ...state,
                cap: action.data,
            }
        case CHANGE_ABOUT_ME:
            return {
                ...state,
                aboutMe: action.data,
            }
        default:
            return state
    }
}

const setProfile = (data) => ({
    type: SET_PROFILE,
    data,
})
const setAvatar = (data) => ({
    type: CHANGE_AVATAR,
    data,
})
const setCap = (data) => ({
    type: CHANGE_CAP,
    data,
})
const setAboutMe = (data) => ({
    type: CHANGE_ABOUT_ME,
    data,
})

export const getProfile = (userId) => async (dispatch) => {
    dispatch(setLoader(true))
    try {
        const data = await profile.getProfile(userId)
        dispatch(setProfile(data))
        dispatch(setLoader(false))
    } catch (error) {
        dispatch(setLoader(false))
    }
}
export const changeAvatar = (avatar) => async (dispatch) => {
    dispatch(setLoader(true))
    try {
        const data = await profile.changeAvatar(avatar)
        dispatch(setAvatar(data.avatar))
        dispatch(setLoader(false))
    } catch (error) {
        dispatch(setLoader(false))
    }
}
export const changeCap = (cap) => async (dispatch) => {
    dispatch(setLoader(true))
    try {
        const data = await profile.changeCap(cap)
        dispatch(setCap(data.cap))
        dispatch(setLoader(false))
    } catch (error) {
        dispatch(setLoader(false))
    }
}
export const changeAboutMe = (aboutMe) => async (dispatch) => {
    dispatch(setLoader(true))
    try {
        await profile.changeAboutNe(aboutMe)
        dispatch(setAboutMe(aboutMe))
        dispatch(setLoader(false))
    } catch (error) {
        dispatch(setLoader(false))
    }
}
export default ProfileReducer
