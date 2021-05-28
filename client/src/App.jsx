import React, { useEffect } from 'react'
import { routes } from './routes'
import { BrowserRouter as Router } from 'react-router-dom'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { login, setComplete } from './redux/reducers/AuthReducer'
import { SuspenseLoader } from './components/Loader/Loader'
import { storageName } from './constants'

const Container = styled.div`
    width: 100%;
    height: 100vh;
    display: block;
    background-color: #000;
    overflow-x: hidden;
    overflow-y: auto;
    font-size: 15px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; !important;
    [type='file'] {
        display: none;
    }
    `

function App({ login, isAuth, isComplete, setComplete }) {
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName))
        login({ token: data?.token, userId: data?.userId })
        setComplete(true)
    }, [login, setComplete])
    const Route = routes(isAuth)
    return (
        <Container>
            {!isComplete && <SuspenseLoader />}
            <Router>{Route}</Router>
        </Container>
    )
}

const mapStateToProps = (state) => ({
    isAuth: state.Auth.isAuth,
    isComplete: state.Auth.isComplete,
})

export default connect(mapStateToProps, { login, setComplete })(App)
