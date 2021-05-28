import React, { Suspense } from 'react'
import { SuspenseLoader } from '../components/Loader/Loader'

const withSuspense = (Component) => {
    return (props) => (
        <Suspense fallback={<SuspenseLoader />}>
            <Component {...props} />
        </Suspense>
    )
}
export default withSuspense
