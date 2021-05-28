import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { FormControl, Alert } from '../../../styled'
import ButtonDisabled from '../../ButtonDisabled'
import { Main } from '../flow.styled'

const RegistrationConfirmEmail = ({
    email,
    errorMessage,
    confirmEmail,
    isLoader,
}) => {
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm()
    const watchFields = watch('token')
    const onSubmit = useCallback(
        async (formObj) => {
            try {
                await confirmEmail({ email, ...formObj })
                reset()
            } catch (error) {}
        },
        [confirmEmail, email, reset]
    )
    return (
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
            <Main>
                {errorMessage?.confirmEmail && (
                    <Alert severity="error" marg={'15px 0 0 0'}>
                        {errorMessage?.confirmEmail?.token}
                    </Alert>
                )}
                <h1>Мы отправили вам код</h1>
                <p>
                    Введите код в расположенном ниже поле для подтверждения
                    {' ' + email}.
                </p>
                <FormControl pad="15px 0 " err={errors?.token} marg="0 0 5px">
                    <input
                        {...register('token')}
                        type="token"
                        id="confirm-email"
                        required
                    />
                    <label htmlFor="confirm-email">Проверочный код</label>
                    <span>{errors?.token?.message}</span>
                </FormControl>
                <ButtonDisabled
                    watchFields={!!watchFields}
                    errors={!errors.token}
                    isLoader={!isLoader}
                >
                    Далее
                </ButtonDisabled>
            </Main>
        </form>
    )
}
export default RegistrationConfirmEmail
