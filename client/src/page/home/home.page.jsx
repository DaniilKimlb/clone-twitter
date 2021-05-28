import withAuthRedirect from '../../hoc/withAuthRedirect'

const Home = () => {
    return <h1 style={{ color: '#fff' }}>Home page</h1>
}

export default withAuthRedirect(Home)
