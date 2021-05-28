import { Main } from '../flow.styled'
import DefaultPhoto from '../../../assets/img/default_profile_400x400.png'
import { Button, Flex, Icons, Img } from '../../../styled'
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto'
import { useCallback, useState } from 'react'
import CloseIcon from '@material-ui/icons/Close'
import useFile from '../../../hooks/file.hook'

const UpdateAvatar = ({ changeAvatar, avatar, setPage }) => {
    const { file, handlerChangeFile, img, handlerClickForRemoveImg } = useFile()
    const [isDrag, setIsDrag] = useState(false)

    const handlerClick = useCallback(async () => {
        try {
            if (file) {
                await changeAvatar(file)
            }
            setPage(2)
        } catch (error) {}
    }, [file, setPage, changeAvatar])

    const handlerDragStart = (e) => {
        e.preventDefault()
        setIsDrag(true)
    }
    const handlerDragLeave = (e) => {
        setIsDrag(false)
    }
    const handlerDrop = (e) => {
        e.preventDefault()
        const file = e.dataTransfer.files[0]
        handlerChangeFile(null, file)
        setIsDrag(false)
    }
    return (
        <Main>
            <h1>Выберите изображение профиля</h1>
            <p>Загрузите свое лучшее селфи.</p>
            <Flex
                width="192px"
                marg="64px auto"
                ai="center"
                jc="space-around"
                us="none"
                pos="relative"
                zIndex="5"
                borRad="50%"
                height="192px"
                onDragStart={handlerDragStart}
                onDragLeave={handlerDragLeave}
                onDragOver={handlerDragStart}
                onDrop={handlerDrop}
            >
                <Img
                    border={isDrag ? '2px dashed #1da1f2' : '2px solid #000'}
                    boxSh="0px 0px 0px 2px #fff"
                    opacity="0.75"
                    height="192px"
                    width="192px"
                    borRad="50%"
                    src={img ? img : (avatar && avatar) || DefaultPhoto}
                    zIndex="2"
                    pos="absolute"
                    bottom="0"
                    top="0"
                />
                <Icons zIndex="3" title="Добавить фотографию">
                    <label>
                        <input
                            draggable
                            type="file"
                            onChange={handlerChangeFile}
                            accept="image/jpeg,image/png,image/jpg"
                        />
                        <AddAPhotoIcon />
                    </label>
                </Icons>
                {img && (
                    <Icons
                        zIndex="3"
                        title="Удалить фотографию"
                        onClick={handlerClickForRemoveImg}
                    >
                        <label>
                            <CloseIcon />
                        </label>
                    </Icons>
                )}
            </Flex>
            <Button
                pos="absolute"
                width="80px"
                top="10px"
                pad="7px 0"
                onClick={handlerClick}
                right="15px"
                fw="700"
                hover={!!img}
                color={!img ? '#1da1f2' : '#fff'}
                bgc={!img ? '#000' : '#1da1f2'}
            >
                {img ? 'Далее' : 'Пропустить'}
            </Button>
        </Main>
    )
}
export default UpdateAvatar
