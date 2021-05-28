import { useCallback, useState } from 'react'

const useFile = () => {
    const [img, setImg] = useState('')
    const [file, setFile] = useState(null)

    const handlerChangeFile = useCallback((e, files) => {
        const file = files || e.target.files[0]
        setFile(file)
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png']
        if (allowedTypes.includes(file.type)) {
            const reader = new FileReader()
            reader.onload = (ev) => {
                setImg(ev.target.result)
            }
            reader.readAsDataURL(file)
        }
    }, [])
    const handlerClickForRemoveImg = (e) => {
        setImg('')
    }
    return { img, file, handlerChangeFile, handlerClickForRemoveImg }
}

export default useFile
