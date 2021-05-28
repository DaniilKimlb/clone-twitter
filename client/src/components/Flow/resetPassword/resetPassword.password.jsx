import { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useCheckFields } from '../../../hooks/checkFields.hook'
import { Alert, FormControl } from '../../../styled'
import { isEmpty } from '../../../utility/utility'
import ButtonDisabled from '../../ButtonDisabled'
import { Main } from '../flow.styled'

const Password = ({
    email,
    isLoader,
    errorMessage,
    setPage,
    resetToken,
    password,
    setIsChangePasswordComplete,
}) => {
    const [isClick, setIsClick] = useState(false)
    const onSubmit = useCallback(
        async (formObj) => {
            try {
                await password({
                    token: resetToken,
                    email,
                    password: formObj.password,
                })
                setIsClick(true)
            } catch (error) {}
        },
        [email, password, resetToken]
    )

    useEffect(() => {
        if (isClick && !errorMessage.resetPassword) {
            setIsChangePasswordComplete(true)
        }
        setIsClick(false)
    }, [
        errorMessage.resetPassword,
        isClick,
        setIsChangePasswordComplete,
        setPage,
    ])

    const {
        formState: { errors },
        register,
        watch,
        handleSubmit,
    } = useForm({ mode: 'all' })
    const watchFields = watch()
    const isFullFields = useCheckFields(watchFields)
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {errorMessage?.resetPassword && (
                <Alert severity="error" marg={'15px 0 0 0'}>
                    {errorMessage?.resetPassword?.message}
                </Alert>
            )}
            <Main>
                <h1>Сброс пароля</h1>
                <p>Надёжные пароли содержат буквы, цифры и знаки препинания.</p>
                <FormControl err={errors?.password}>
                    <input
                        type="password"
                        id="password"
                        required
                        {...register('password', {
                            minLength: {
                                value: 6,
                                message:
                                    'Пароль должен содержать минимум 6 символа',
                            },
                        })}
                    />
                    <label htmlFor="password">Введите новый пароль</label>
                    <span>{errors?.password?.message}</span>
                </FormControl>
                <FormControl err={errors?.confirmPassword} marg="0 0 5px">
                    <input
                        type="password"
                        id="confirm-password"
                        required
                        {...register('confirmPassword', {
                            validate: (value) =>
                                value === watch('password') ||
                                'Пароли не совпадают',
                        })}
                    />
                    <label htmlFor="confirm-password">
                        Введите новый еще раз
                    </label>
                    <span>{errors?.confirmPassword?.message}</span>
                </FormControl>
                <ButtonDisabled
                    isFullFields={isFullFields}
                    isLoader={!isLoader}
                    errors={!isEmpty(errors)}
                    password={watch('password') === watch('confirmPassword')}
                >
                    Сбросить пароль
                </ButtonDisabled>
            </Main>
        </form>
    )
}
export default Password
