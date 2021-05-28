import TwitterIcon from '@material-ui/icons/Twitter'
import { Flex, FormControl, Alert } from '../../../styled'
import { Link, Redirect } from 'react-router-dom'
import { Hints, LoginContent } from './login.styled'
import { connect } from 'react-redux'
import { useForm } from 'react-hook-form'
import { signin } from '../../../redux/reducers/AuthReducer'
import { useCheckFields } from '../../../hooks/checkFields.hook'
import { useCallback } from 'react'
import ButtonDisabled from '../../../components/ButtonDisabled'

const Login = ({ isAuth, signin, errorMessage, isLoader }) => {
    const { register, handleSubmit, watch, reset } = useForm()

    const watchFields = watch()
    const isFullFields = useCheckFields(watchFields)
    const onSubmit = useCallback(
        async (formObj) => {
            try {
                await signin({ ...formObj })
                reset()
            } catch (error) {}
        },
        [reset, signin]
    )

    if (isAuth) {
        return <Redirect to="/home" />
    }
    return (
        <Flex pad="20px 0" jc="center">
            <LoginContent>
                <TwitterIcon />
                <h2>Войти в Твиттер</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {errorMessage.login && (
                        <Alert severity="error">{errorMessage.login}</Alert>
                    )}
                    <FormControl>
                        <input
                            {...register('email', { required: true })}
                            type="text"
                            id="email"
                            required
                            spellCheck="false"
                        />
                        <label htmlFor="email">Адрес электронной почты</label>
                    </FormControl>
                    <FormControl>
                        <input
                            {...register('password', { required: true })}
                            type="password"
                            id="password"
                            required
                            spellCheck="false"
                        />
                        <label htmlFor="password">Пароль</label>
                    </FormControl>
                    <ButtonDisabled
                        isFullFields={isFullFields}
                        isLoader={!isLoader}
                    >
                        Войти
                    </ButtonDisabled>
                </form>

                <Hints>
                    <Link to="i/flow/resetPassword">
                        Забыли <br /> пароль?
                    </Link>
                    <span>.</span>
                    <Link to="i/flow/signup">
                        Зарегистрироваться в <br /> Твиттере
                    </Link>
                </Hints>
            </LoginContent>
        </Flex>
    )
}
const mapStateToProps = (state) => ({
    isAuth: state.Auth.isAuth,
    isLoader: state.Auth.isLoader,
    errorMessage: state.Auth.errorMessage,
})
export default connect(mapStateToProps, { signin })(Login)
