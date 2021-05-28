import { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { patternValidateEmail } from '../../../constants'
import { useCheckFields } from '../../../hooks/checkFields.hook'
import { Alert, FormControl } from '../../../styled'
import { isEmpty } from '../../../utility/utility'
import ButtonDisabled from '../../ButtonDisabled'
import { Main } from '../flow.styled'

const ResetPassword = ({
    setPage,
    resetPassword,
    errorMessage,
    isLoader,
    setEmail,
}) => {
    const {
        register,
        formState: { errors },
        handleSubmit,
        watch,
        reset,
    } = useForm({ mode: 'onChange' })
    const watchFields = watch()
    const isFullFields = useCheckFields(watchFields)
    const [isClick, setIsClick] = useState(false)
    const onSubmit = useCallback(
        async (formObj) => {
            try {
                const { email } = formObj
                await resetPassword(email)
                reset()
                setEmail(email)
                setIsClick(true)
            } catch (error) {}
        },
        [resetPassword, reset, setEmail]
    )
    useEffect(() => {
        if (isClick && !errorMessage.resetPassword) {
            setPage(2)
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
                <h1>Найдите свою учетную запись в Твиттере</h1>
                <p>Укажите адрес электронной почты </p>
                <FormControl pad="15px 0" err={errors?.email} marg="0 0 5px">
                    <input
                        {...register('email', {
                            pattern: patternValidateEmail,
                        })}
                        type="text"
                        id="email"
                        required
                    />
                    <label htmlFor="email">Адрес электронной почты</label>
                    <span>{errors?.email?.message}</span>
                </FormControl>
                <ButtonDisabled
                    isFullFields={isFullFields}
                    isLoader={!isLoader}
                    errors={!isEmpty(errors)}
                >
                    Найти
                </ButtonDisabled>
            </Main>
        </form>
    )
}

export default ResetPassword
