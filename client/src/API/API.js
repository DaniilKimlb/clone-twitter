import axios from 'axios'
import { storageName } from '../constants'
const headers = () => {
    const headers = {}
    const data = JSON.parse(localStorage.getItem(storageName))
    if (data) {
        headers['Authorization'] = 'Bearer ' + data.token
    }
    return headers
}
const instance = axios.create({
    baseURL: '/api/',
})

export const auth = {
    signin: async ({ email, password }) => {
        try {
            const response = await instance.post('auth/signin', {
                email,
                password,
            })
            return response.data
        } catch (error) {
            throw error
        }
    },
    signup: async ({
        name,
        email,
        password,
        dayOfBirth,
        yearOfBirth,
        monthOfBirth,
    }) => {
        try {
            const response = await instance.post('auth/signup', {
                name,
                email,
                password,
                dayOfBirth,
                yearOfBirth,
                monthOfBirth,
            })
            return response.data
        } catch (error) {
            throw error
        }
    },
    emailVerification: async (email) => {
        try {
            const response = await instance.get(
                'auth/emailVerification?email=' + email
            )
            return response.data
        } catch (error) {
            throw error
        }
    },
    confirmEmail: async ({ email, token }) => {
        try {
            const response = await instance.put('auth/confirmEmail', {
                email,
                token,
            })
            return response.data
        } catch (error) {
            throw error
        }
    },
    reset: async (email) => {
        try {
            const response = await instance.post('auth/reset', {
                email,
            })
            return response.data
        } catch (error) {
            throw error
        }
    },
    checkTokenForReset: async ({ email, token }) => {
        try {
            const response = await instance.get(
                `auth/checkTokenForReset?email=${email}&token=${token}`
            )
            return response.data
        } catch (error) {
            throw error
        }
    },
    password: async ({ email, token, password }) => {
        try {
            const response = await instance.put('auth/password', {
                email,
                token,
                password,
            })
            return response.data
        } catch (error) {
            throw error
        }
    },
}
export const profile = {
    getProfile: async (userId) => {
        try {
            const response = await instance.get('profile/' + userId, {
                headers: headers(),
            })
            return response.data
        } catch (error) {
            throw error
        }
    },
    changeAvatar: async (avatar) => {
        try {
            const formData = new FormData()
            formData.append('avatar', avatar)
            const response = await instance.put('profile/avatar', formData, {
                headers: headers(),
            })
            return response.data
        } catch (error) {
            throw error
        }
    },
    changeCap: async (cap) => {
        try {
            const formData = new FormData()
            formData.append('cap', cap)
            const response = await instance.put('profile/cap', formData, {
                headers: headers(),
            })
            return response.data
        } catch (error) {
            throw error
        }
    },
    changeAboutNe: async (aboutMe) => {
        try {
            const response = await instance.put(
                'profile/aboutMe',
                { aboutMe },
                { headers: headers() }
            )
            return response.data
        } catch (error) {
            throw error
        }
    },
}
