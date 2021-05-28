import styled from 'styled-components'

export const LoginContent = styled.div`
    max-width: 335px;
    width: 100%;
    word-wrap: break-word;

    svg {
        font-size: 3rem;
        color: #d9d9d9;
    }
    h2 {
        margin: 20px 0;
        font-size: 31px;
        line-height: 36px;
        color: #d9d9d9;
    }
    input {
        margin: 20px 0;
    }
`
export const Hints = styled.div`
    display: flex;
    margin: 30px 0;
    color: #6e767d;
    justify-content: space-around;
    a {
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        color: #1a91da;
        line-height: 20px;
        text-decoration: none;
    }
`
