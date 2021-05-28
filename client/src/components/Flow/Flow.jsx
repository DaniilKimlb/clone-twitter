import React, { useCallback, useEffect, useState } from 'react'
import { Flex } from '../../styled'
import TwitterIcon from '@material-ui/icons/Twitter'
import CloseIcon from '@material-ui/icons/Close'
import { Close, Content, Header } from './flow.styled'
import Modal from '../Modal'
import RegistrationConfirmEmail from './registration/registration.confirmEmail.container'
import RegistrationDataInput from './registration/registration.dataInput.container'
import { Redirect, useParams } from 'react-router-dom'
import ResetPassword from './resetPassword/resetPassword.container'
import ConfirmToken from './resetPassword/resetPassword.confirmToken.container'
import Password from './resetPassword/resetPassword.password.container'
import UpdateAvatar from './setupProfile/setupProfile.avatar.container'
import UpdateCap from './setupProfile/setupProfile.cap.container'
import UpdateAboutMe from './setupProfile/setupProfile.aboutme.container'

const Flow = ({ setError, isAuth }) => {
    const [page, setPage] = useState(1)
    const [email, setEmail] = useState(null)
    const [isChangePasswordComplete, setIsChangePasswordComplete] =
        useState(null)
    const [isChangeSetupPasswordComplete, setIsChangeSetupPasswordComplete] =
        useState(null)
    const params = useParams()

    useEffect(() => {
        setPage(1)
    }, [params.page])

    const [isModal, setIsModal] = useState(false)

    const pages = useCallback(() => {
        switch (params.page) {
            case 'signup':
                if (isAuth) {
                    return <Redirect to="setup_profile" />
                }
                switch (page) {
                    case 1:
                        return (
                            <RegistrationDataInput
                                setPage={setPage}
                                setEmail={setEmail}
                            />
                        )
                    case 2:
                        return (
                            <RegistrationConfirmEmail
                                setPage={setPage}
                                email={email}
                            />
                        )
                    default:
                        break
                }
                break
            case 'setup_profile':
                if (!isAuth && !isModal) return setIsModal(true)
                switch (page) {
                    case 1:
                        return <UpdateAvatar setPage={setPage} />
                    case 2:
                        return <UpdateCap setPage={setPage} />
                    case 3:
                        return (
                            <UpdateAboutMe
                                setIsChangeSetupPasswordComplete={
                                    setIsChangeSetupPasswordComplete
                                }
                                setPage={setPage}
                            />
                        )
                    default:
                        break
                }
                break
            case 'resetPassword':
                switch (page) {
                    case 1:
                        return (
                            <ResetPassword
                                setEmail={setEmail}
                                setPage={setPage}
                            />
                        )
                    case 2:
                        return <ConfirmToken setPage={setPage} email={email} />
                    case 3:
                        return (
                            <Password
                                setIsChangePasswordComplete={
                                    setIsChangePasswordComplete
                                }
                                email={email}
                                setPage={setPage}
                            />
                        )
                    default:
                        break
                }
                break
            default:
                if (!isModal) setIsModal(true)
                break
        }
    }, [email, isAuth, isModal, page, params.page])
    return (
        <>
            {isModal && <Modal />}
            {isChangePasswordComplete && (
                <Modal title="Пароль изменен">Перейти на главную?</Modal>
            )}
            {isChangeSetupPasswordComplete && (
                <Modal linkUrl="/profile" title="Профиль обновлен">
                    Просмотреть профиль
                </Modal>
            )}
            <div
                style={{
                    height: '100%',
                    width: '100%',
                    overflow: 'auto',
                    backgroundColor: 'rgb(36,45,52)',
                }}
            >
                <Flex ai="center" jc="center">
                    <Content>
                        <Header>
                            {page > 1 && (
                                <Close title="Закрыть">
                                    <CloseIcon
                                        onClick={() => {
                                            setPage((prev) => --prev)
                                            setError({})
                                        }}
                                    />
                                </Close>
                            )}
                            <TwitterIcon />
                        </Header>
                        {pages()}
                    </Content>
                </Flex>
            </div>
        </>
    )
}

export default React.memo(Flow)
