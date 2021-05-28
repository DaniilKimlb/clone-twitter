export const isEmpty = (obj) => {
    return !!Object.keys(obj).length
}
export const delay = (ms) => new Promise((res) => setTimeout(() => res(), ms))
