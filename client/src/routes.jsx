import { Route, Switch, Redirect } from 'react-router-dom'
import React from 'react'
import Auth from './page/auth/auth.page'
import withSuspense from './hoc/withSuspense'
import Home from './page/home/home.page'
const Login = React.lazy(() => import('./page/auth/login/login'))
const Flow = React.lazy(() => import('./components/Flow/flow.container'))

export const routes = (isAuthorized) => {
    return (
        <Switch>
            <Route path="/" exact>
                <Auth />
            </Route>

            <Route path="/home" exact>
                <Home />
            </Route>

            <Route path="/login" exact>
                {withSuspense(Login)}
            </Route>
            <Route path="/i/flow/:page">{withSuspense(Flow)}</Route>
            <Redirect to="/home" />
        </Switch>
    )
}
