import React from 'react'
import { connect } from 'react-redux'
import { setError } from '../../redux/reducers/AuthReducer'
import Flow from './Flow'

const FlowContainer = ({ setError, isAuth, isLoader }) => {
    return <Flow setError={setError} isLoader={isLoader} isAuth={isAuth} />
}

const mapStateToProps = (state) => ({
    isAuth: state.Auth.isAuth,
})

export default connect(mapStateToProps, {
    setError,
})(FlowContainer)
