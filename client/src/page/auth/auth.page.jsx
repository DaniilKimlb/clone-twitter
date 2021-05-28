import TwitterIcon from '@material-ui/icons/Twitter'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import { Flex, LinkS } from '../../styled'
import {
    ContentRight,
    FlexLinks,
    LeftHandSide,
    RightHandSide,
} from './auth.styled'

const Auth = ({ isAuth }) => {
    if (isAuth) {
        return <Redirect to="/home" />
    }
    return (
        <Flex jc="space-between">
            <LeftHandSide>
                <TwitterIcon />
            </LeftHandSide>
            <RightHandSide>
                <ContentRight>
                    <TwitterIcon />
                    <h1>
                        В курсе <br /> происходящего
                    </h1>
                    <p>
                        Присоединяйтесь к Твиттеру
                        <br /> прямо сейчас!
                    </p>
                    <FlexLinks>
                        <Link to="/i/flow/signup">
                            <LinkS
                                bgc={'#1DA1F2'}
                                maxWidth="380px"
                                marg="0.7rem 0 "
                                hover
                                pad="0.8em 0"
                            >
                                <span>Зарегистрироваться</span>
                            </LinkS>
                        </Link>
                        <Link to="/login">
                            <LinkS
                                borderColor="#1DA1F2"
                                maxWidth="380px"
                                marg="1rem 0 "
                                color="#1DA1F2"
                                pad="0.8em 0"
                            >
                                <span>Войти</span>
                            </LinkS>
                        </Link>
                    </FlexLinks>
                </ContentRight>
            </RightHandSide>
        </Flex>
    )
}
const mapStateToProps = (state) => ({
    isAuth: state.Auth.isAuth,
})
export default connect(mapStateToProps)(Auth)
