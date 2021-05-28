import { auth } from '../../API/API'
import { storageName } from '../../constants'

const SET_LOADER = 'auth/SET_LOADER'
const SET_ERROR = 'auth/SET_ERROR'
const SET_TOKEN = 'auth/SET_TOKEN'
const SET_USERID = 'auth/SET_USERID'
const IS_AUTH = 'auth/IS_AUTH'
const IS_COMPLETE = 'auth/IS_COMPLETE'
const SET_RESET_TOKEN = 'auth/SET_RESET_TOKEN'
const initialState = {
    errorMessage: {},
    isLoader: false,
    token: null,
    userId: null,
    isAuth: false,
    isComplete: false,
    resetToken: null,
}

const AuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_LOADER:
            return { ...state, isLoader: action.data }
        case SET_ERROR:
            return { ...state, errorMessage: action.data }
        case SET_TOKEN:
            return { ...state, token: action.data }
        case SET_USERID:
            return { ...state, userId: action.data }
        case IS_AUTH:
            return { ...state, isAuth: action.data }
        case IS_COMPLETE:
            return { ...state, isComplete: action.data }
        case SET_RESET_TOKEN:
            return { ...state, resetToken: action.data }
        default:
            return state
    }
}

export const setLoader = (data) => ({
    type: SET_LOADER,
    data,
})

export const setError = (data) => ({
    type: SET_ERROR,
    data,
})
export const setToken = (data) => ({
    type: SET_TOKEN,
    data,
})

export const setUserId = (data) => ({
    type: SET_USERID,
    data,
})
const setIsAuth = (data) => ({
    type: IS_AUTH,
    data,
})
export const setComplete = (data) => ({
    type: IS_COMPLETE,
    data,
})
const setTokenReset = (data) => ({
    type: SET_RESET_TOKEN,
    data,
})

// thunk
export const login =
    ({ token, userId }) =>
    (dispatch) => {
        if (!token && !userId) return
        dispatch(setLoader(true))
        dispatch(setUserId(userId))
        dispatch(setToken(token))
        dispatch(setIsAuth(true))
        localStorage.setItem(storageName, JSON.stringify({ token, userId }))
        dispatch(setLoader(false))
    }

export const signin =
    ({ email, password }) =>
    async (dispatch) => {
        dispatch(setLoader(true))
        try {
            const data = await auth.signin({ email, password })
            dispatch(login({ token: data?.token, userId: data?.userId }))
            dispatch(setError({}))
            dispatch(setLoader(false))
        } catch (error) {
            dispatch(
                setError({
                    login: 'Введённые имя пользователя и пароль не совпадают с сохранёнными в нашей базе данных. Проверьте правильность введённых данных и повторите попытку.',
                })
            )
            dispatch(setLoader(false))
        }
    }
export const signup =
    ({ name, email, password, dayOfBirth, yearOfBirth, monthOfBirth }) =>
    async (dispatch) => {
        dispatch(setLoader(true))
        try {
            await auth.signup({
                name,
                email,
                password,
                dayOfBirth,
                yearOfBirth,
                monthOfBirth,
            })

            dispatch(setLoader(false))
        } catch (error) {
            dispatch(setLoader(false))
        }
    }
export const emailVerification = (email) => async (dispatch) => {
    try {
        await auth.emailVerification(email)
        dispatch(setError({}))
    } catch (error) {
        dispatch(
            setError({
                signup: { email: 'Адрес электронной почты уже занят.' },
            })
        )
    }
}
export const confirmEmail =
    ({ email, token }) =>
    async (dispatch) => {
        dispatch(setLoader(true))
        try {
            const data = await auth.confirmEmail({ email, token })
            dispatch(setError({}))
            dispatch(login({ userId: data.userId, token: data.token }))
            dispatch(setLoader(false))
        } catch (error) {
            dispatch(
                setError({
                    confirmEmail: { token: 'Неверный проверочный код.' },
                })
            )
            dispatch(setLoader(false))
        }
    }

export const resetPassword = (email) => async (dispatch) => {
    dispatch(setLoader(true))
    try {
        await auth.reset(email)
        dispatch(setError({}))
        dispatch(setLoader(false))
    } catch (error) {
        dispatch(
            setError({
                resetPassword: {
                    message:
                        'Мы не можем найти вашу учетную запись по этим данным',
                },
            })
        )
        dispatch(setLoader(false))
    }
}
export const checkTokenForReset =
    ({ email, token }) =>
    async (dispatch) => {
        dispatch(setLoader(true))
        try {
            const data = await auth.checkTokenForReset({ email, token })
            dispatch(setTokenReset(data.resetToken))
            dispatch(setError({}))
            dispatch(setLoader(false))
        } catch (error) {
            dispatch(
                setError({
                    resetPassword: { message: 'Неверный код.' },
                })
            )
            dispatch(setLoader(false))
        }
    }
export const password =
    ({ email, token, password }) =>
    async (dispatch) => {
        dispatch(setLoader(true))
        try {
            await auth.password({ email, token, password })
            dispatch(setError({}))
            dispatch(setLoader(false))
        } catch (error) {
            dispatch(setLoader(false))
            dispatch(
                setError({
                    resetPassword: { message: 'Время жизни кода истекло.' },
                })
            )
        }
    }
export default AuthReducer
