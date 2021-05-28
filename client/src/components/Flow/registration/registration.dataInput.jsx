import { useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDate } from '../../../hooks/date.hook'
import { useDebounce } from '../../../hooks/debounce.hook'
import { Flex, FormControl } from '../../../styled'
import { DateOfBirth, FormControlSelect, Main, Select } from '../flow.styled'
import { isEmpty } from '../../../utility/utility'
import { useCheckFields } from '../../../hooks/checkFields.hook'
import { patternValidateEmail } from '../../../constants'
import ButtonDisabled from '../../ButtonDisabled'

const RegistrationDataInput = ({
    signup,
    isLoader,
    emailVerification,
    setEmail,
    errorMessage,
    setPage,
}) => {
    const { days, handlerSelectMount, years, mounts } = useDate()
    const onSubmit = useCallback(
        async (formObj) => {
            try {
                await signup(formObj)
                setEmail(formObj.email)
                setPage(2)
            } catch (error) {}
        },
        [signup, setPage, setEmail]
    )
    const {
        handleSubmit,
        register,
        watch,
        formState: { errors },
    } = useForm({ mode: 'onChange' })

    const watchFields = watch()
    const isFullFields = useCheckFields(watchFields)

    const emailDebounced = useDebounce(watchFields.email, 500)
    useEffect(() => {
        if (emailDebounced?.length > 1 && !errors.email) {
            emailVerification(emailDebounced)
        }
    }, [emailDebounced, emailVerification, errors.email])
    return (
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
            <Main>
                <h1>Создайте учетную запись</h1>
                <FormControl err={errors.name} pad="15px">
                    <input
                        {...register('name', {
                            required: 'Как вас зовут?',
                            pattern: {
                                value: /[a-zA-ZА-Яа-я]/,
                                message: 'Введите правильное имя.',
                            },
                            minLength: 1,
                            maxLength: 50,
                        })}
                        type="text"
                        autoFocus
                        name="name"
                        id="name"
                        required
                    />
                    <label htmlFor="name">Имя</label>
                    <span>{errors?.name?.message}</span>
                </FormControl>
                <FormControl
                    err={errors.email || errorMessage.signup?.email}
                    pad="15px"
                >
                    <input
                        {...register('email', {
                            required: 'Это поле обязательное',
                            pattern: patternValidateEmail,
                        })}
                        type="text"
                        name="email"
                        id="email"
                        required
                    />
                    <label htmlFor="email">Адрес электронной почты</label>
                    <span>
                        {errors?.email?.message || errorMessage?.signup?.email}
                    </span>
                </FormControl>
                <FormControl err={errors.password} pad="15px">
                    <input
                        {...register('password', {
                            required: 'Это поле обязательное',
                            minLength: {
                                value: 6,
                                message:
                                    'Пароль должен содержать минимум 6 символа',
                            },
                        })}
                        type="password"
                        name="password"
                        autoComplete="false"
                        id="password"
                        required
                    />
                    <label htmlFor="password">Пароль</label>
                    <span>{errors?.password?.message}</span>
                </FormControl>{' '}
                <DateOfBirth>
                    <p>
                        <span>Дата рождения</span>
                        <br /> Эта информация не будет общедоступной.
                        Подтвердите свой возраст, даже если эта учетная запись
                        предназначена для компании, домашнего животного и т. д.
                    </p>
                    <Flex jc="space-between" pad="0 0 15px ">
                        <FormControlSelect>
                            <Select
                                {...register('monthOfBirth', {
                                    required: 'Это поле обязательное',
                                    min: 1,
                                })}
                                name="monthOfBirth"
                                id="mount"
                                width="220"
                                defaultValue=""
                                onChange={handlerSelectMount}
                            >
                                <option value="" defaultChecked>
                                    {''}
                                </option>
                                {mounts.map((e, idx) => (
                                    <option value={idx + 1} key={idx}>
                                        {e}
                                    </option>
                                ))}
                            </Select>
                            <label htmlFor="day">Месяц</label>
                        </FormControlSelect>
                        <FormControlSelect>
                            <Select
                                name="dayOfBirth"
                                id="day"
                                width="125"
                                defaultValue=""
                                {...register('dayOfBirth', {
                                    required: 'Это поле обязательное',
                                    min: 1,
                                })}
                            >
                                <option value="" defaultChecked>
                                    {''}
                                </option>
                                {days.map((e, idx) => (
                                    <option value={idx + 1} key={idx}>
                                        {e}
                                    </option>
                                ))}
                            </Select>
                            <label htmlFor="year">День</label>
                        </FormControlSelect>
                        <FormControlSelect>
                            <Select
                                defaultValue=""
                                name="yearOfBirth"
                                id="year"
                                width="125"
                                {...register('yearOfBirth', {
                                    required: 'Это поле обязательное',
                                    min: 1,
                                })}
                            >
                                <option value="" defaultChecked>
                                    {''}
                                </option>
                                {years.map((e, idx) => (
                                    <option value={e} key={idx}>
                                        {e}
                                    </option>
                                ))}
                            </Select>
                            <label htmlFor="year">Год</label>
                        </FormControlSelect>
                    </Flex>
                </DateOfBirth>
                <ButtonDisabled
                    isFullFields={isFullFields}
                    errors={!isEmpty(errors)}
                    isLoader={!isLoader}
                    errorMessage={!errorMessage.signup}
                >
                    Далее
                </ButtonDisabled>
            </Main>
        </form>
    )
}
export default RegistrationDataInput
