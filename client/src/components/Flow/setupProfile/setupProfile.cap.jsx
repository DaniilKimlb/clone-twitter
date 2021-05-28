import { useCallback, useState } from 'react'
import { Button, Flex, Icons, Img } from '../../../styled'
import { Main } from '../flow.styled'
import CloseIcon from '@material-ui/icons/Close'
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto'
import useFile from '../../../hooks/file.hook'
import DefaultPhoto from '../../../assets/img/default_profile_400x400.png'

const UpdateCap = ({ setPage, avatar, name, username, changeCap, cap }) => {
    const { file, handlerChangeFile, img, handlerClickForRemoveImg } = useFile()
    const [isDrag, setIsDrag] = useState(false)
    const handlerClick = useCallback(async () => {
        try {
            if (file) {
                await changeCap(file)
            }
            setPage(3)
        } catch (error) {}
    }, [setPage, file, changeCap])

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
            <h1>Выберите шапку</h1>
            <p>
                Люди, которые будут заходить на страницу вашего профиля, увидят
                это изображение. Покажите стиль!
            </p>
            <Flex
                width="100%"
                marg="64px auto"
                ai="center"
                jc="center"
                onDragStart={handlerDragStart}
                onDragOver={handlerDragStart}
                onDragLeave={handlerDragLeave}
                onDrop={handlerDrop}
                us="none"
                pos="relative"
                borderRight={isDrag && '2px dashed #1da1f2'}
                borderLeft={isDrag && '2px dashed #1da1f2 '}
                zIndex="5"
                height="140px"
            >
                {(img || cap) && (
                    <Img
                        src={img || cap}
                        opacity="0.75"
                        height="140px"
                        width="100%"
                        zIndex="2"
                        pos="absolute"
                        bottom="0"
                        top="0"
                    />
                )}
                <Icons zIndex="3" title="Добавить фотографию" marg="0 20px">
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
                        marg="0 20px"
                        zIndex="3"
                        title="Удалить фотографию"
                        onClick={handlerClickForRemoveImg}
                    >
                        <label>
                            <CloseIcon />
                        </label>
                    </Icons>
                )}
                <Img
                    boxSh="0px 0px 0px 2px #fff"
                    height="140px"
                    width="140px"
                    borRad="50%"
                    src={avatar || DefaultPhoto}
                    zIndex="3"
                    pos="absolute"
                    top="70px"
                    left="0"
                />
            </Flex>
            <h1 style={{ padding: '12px 0 0 5px' }}>{name}</h1>
            <p style={{ padding: '0 5px' }}>{username}</p>
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
export default UpdateCap
