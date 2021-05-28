import { createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { applyMiddleware, combineReducers, compose } from 'redux'
import AuthReducer from './reducers/AuthReducer'
import ProfileReducer from './reducers/ProfileReducer'

const rootReducer = combineReducers({
    Auth: AuthReducer,
    Profile: ProfileReducer,
})
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunkMiddleware))
)

export default store
