import styled from 'styled-components'

export const LeftHandSide = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 15px;
    background-size: 100% auto;
    min-width: 50%;
    @media screen and (max-width: 1000px) {
        display: none;
    }
    position: relative;
    background-image: url(https://abs.twimg.com/sticky/illustrations/lohp_1302x955.png);
    svg {
        font-size: 23rem;
        color: #fff;
        width: 100%;
    }
`
export const RightHandSide = styled.div`
    width: 50%;
    position: relative;
    background-color: #000;
    display: flex;
    @media screen and (max-width: 1000px) {
        min-width: 100%;
        word-wrap: break-word;
    }
    svg {
        font-size: 3rem;
        color: #d9d9d9;
    }
`
export const ContentRight = styled.div`
    width: 100%;
    margin: 19.5% 3.4%;
    display: flex;
    background-size: 100% auto;
    color: #d9d9d9;
    flex-wrap: nowrap;
    flex-direction: column;
    h1 {
        flex-wrap: wrap;
        line-height: 84px;
        font-size: 4rem;
        margin: 3% 0;
        word-wrap: break-word;
    }

    p {
        flex-wrap: wrap;
        line-height: 36px;
        font-size: 2rem;
        word-wrap: break-word;
        font-weight: 700;
        margin: 1.5% 0;
    }
    @media screen and (max-width: 1000px) {
        align-items: center;
        svg {
            align-self: center;
        }
        background-size: 100% auto;
        h1 {
            margin-left: 30px;
            word-wrap: break-word;
        }
    }
    @media screen and (max-width: 550px) {
        display: inline-block;
        word-wrap: break-word;
        h1 {
            font-size: 2.2rem;
            line-height: 40px;
            margin: 0;
        }
        p {
            flex-wrap: wrap;
            line-height: 30px;
            font-size: 1.5rem;
            word-wrap: break-word;
            font-weight: 700;
            margin: 1.5% 0;
        }
    }
`

export const FlexLinks = styled.div`
    a {
        max-width: 380px;
        text-decoration: none;
    }
    @media screen and (max-width: 1000px) {
        display: flex;
        flex-direction: row;
        a {
            min-width: auto;
            margin-left: 15px;
        }
    }
    @media screen and (max-width: 550px) {
        display: inline-block;
        word-wrap: break-word;
        width: 100%;
    }
`
