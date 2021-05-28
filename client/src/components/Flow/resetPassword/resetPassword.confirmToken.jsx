import { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useCheckFields } from '../../../hooks/checkFields.hook'
import { Alert, FormControl } from '../../../styled'
import { isEmpty } from '../../../utility/utility'
import ButtonDisabled from '../../ButtonDisabled'
import { Main } from '../flow.styled'

const ConfirmToken = ({
    errorMessage,
    isLoader,
    email,
    checkTokenForReset,
    setPage,
}) => {
    const {
        register,
        formState: { errors },
        handleSubmit,
        watch,
        reset,
    } = useForm({ mode: 'onChange' })
    const watchFields = watch()
    const [isClick, setIsClick] = useState(false)
    const isFullFields = useCheckFields(watchFields)
    const onSubmit = useCallback(
        async (formObj) => {
            try {
                const { token } = formObj
                await checkTokenForReset({ email, token })
                setIsClick(true)
                reset()
            } catch (error) {}
        },
        [checkTokenForReset, email, reset]
    )
    useEffect(() => {
        if (isClick && !errorMessage.resetPassword) {
            setPage(3)
        }
        setIsClick(false)
    }, [errorMessage.resetPassword, isClick, setPage])
    return (
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Main>
                {errorMessage?.resetPassword && (
                    <Alert severity="error" marg={'15px 0 0 0'}>
                        {errorMessage?.resetPassword?.message}
                    </Alert>
                )}
                <h1>Проверьте свою электронную почту</h1>
                <p>
                    Вы получите код подтверждения, который нужно будет ввести
                    здесь, чтобы сбросить пароль.{' '}
                </p>
                <FormControl pad="15px 0" err={errors?.email} marg="0 0 5px">
                    <input
                        {...register('token')}
                        type="text"
                        id="token"
                        required
                    />
                    <label htmlFor="token">Введите код</label>
                    <span>{errors?.email?.message}</span>
                </FormControl>
                <ButtonDisabled
                    isFullFields={isFullFields}
                    isLoader={!isLoader}
                    errors={!isEmpty(errors)}
                >
                    Подтвердить
                </ButtonDisabled>
            </Main>
        </form>
    )
}

export default ConfirmToken
