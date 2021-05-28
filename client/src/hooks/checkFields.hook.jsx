const { useEffect, useState } = require('react')

export const useCheckFields = (watchFields) => {
    const [isFullFields, setIsFullFields] = useState(false)
    useEffect(() => {
        setIsFullFields(Object.keys(watchFields).every((el) => watchFields[el]))
    }, [setIsFullFields, watchFields])
    return isFullFields
}
