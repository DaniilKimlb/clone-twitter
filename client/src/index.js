import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { createGlobalStyle } from 'styled-components'
import { Provider } from 'react-redux'
import store from './redux/store'

const Global = createGlobalStyle`
*{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}
`

ReactDOM.render(
    <Provider store={store}>
        <Global />
        <App />
    </Provider>,
    document.getElementById('root')
)

reportWebVitals()
