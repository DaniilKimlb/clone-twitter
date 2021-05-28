import { useCallback, useMemo, useState } from 'react'

export const useDate = () => {
    const [day, setDay] = useState(31)
    const [years, setYears] = useState([])
    const [days, setDays] = useState([])
    const mounts = [
        'января',
        'февраля',
        'марта',
        'апреля',
        'мая',
        'июня',
        'июля',
        'августа',
        'сентября',
        'октября',
        'ноябра',
        'декабря',
    ]
    const handlerSelectMount = useCallback((e) => {
        switch (+e.target.value) {
            case 2:
                setDay(28)
                break
            case (3, 6, 9, 11):
                setDay(30)
                break
            default:
                setDay(31)
        }
    }, [])
    useMemo(() => {
        for (let i = 0; i < day; i++) {
            setDays((prev) => [...prev, i + 1])
        }
    }, [setDays, day])
    useMemo(() => {
        for (let i = 0; i < 120; i++) {
            const years = +new Date().getFullYear().toString() - i
            setYears((prev) => [...prev, years])
        }
    }, [setYears])
    return { handlerSelectMount, years, days, mounts }
}
