import styled from 'styled-components'
import TwitterIcon from '@material-ui/icons/Twitter'
import './Loader.css'
const Preloader = styled.div`
    position: absolute;
    display: flex;
    background-color: #000;
    justify-content: center;
    width: 100vw;
    height: 100vh;
    align-items: center;
    svg {
        color: #1da1f2;
        font-size: 5rem;
    }
`

export const SuspenseLoader = () => (
    <Preloader>
        <TwitterIcon />
    </Preloader>
)

export const Loader = () => (
    <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>
)
