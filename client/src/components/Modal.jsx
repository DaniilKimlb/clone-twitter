import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { LinkS } from '../styled'

const Modal = styled.div`
    position: absolute !important;
    left: 0;
    right: 0;
    z-index: 1000;
    top: 0;
    width: 100vw;
    height: 100vh;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(91, 112, 131, 0.3);
    & > div {
        background-color: #000;
        min-width: 320px;
        max-width: 600px;
        overflow: auto;
        padding: 22px 26px;
        min-height: 64px;
        max-height: 100%;
        text-align: center;
        border-radius: 15px;
        & > * {
            margin: 10px 0;
        }
        h3 {
            color: #d9d9d9;
            font-size: 20px;
            line-height: 24px;
        }
        p {
            color: #6e767d;
            line-height: 20px;
        }
        a {
            text-decoration: none;
        }
    }
`

const ModalCom = ({
    title = 'Ошибка',
    children,
    linkUrl = '/',
    buttonText = 'Ok',
}) => {
    return (
        <Modal>
            <div>
                <h3>{title}</h3>
                <p>
                    {children || (
                        <span>
                            Ой, что-то пошло не так. Повторите <br /> попытку
                            позже.
                        </span>
                    )}
                </p>
                <Link to={linkUrl}>
                    <LinkS bgc="#1A91DA" pad="0.6rem 0">
                        <span>{buttonText}</span>
                    </LinkS>
                </Link>
            </div>
        </Modal>
    )
}

export default ModalCom
