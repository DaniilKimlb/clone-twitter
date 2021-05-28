import styled from 'styled-components'

export const Content = styled.div`
    position: relative;
    width: 600px;
    height: 635px;
    background-color: #000;
    border-radius: 15px;
    color: #d9d9d9;
    padding: 0 15px;

    @media screen and (max-width: 600px) {
        width: 100%;
        overflow: auto;
        min-height: 100%;
    }
`
export const Header = styled.header`
    position: relative;
    padding-top: 10px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    svg {
        margin: auto;
        font-size: 35px;
    }
`

export const Close = styled.div`
    color: #1da1f2;
    position: absolute;
    display: flex;
    svg {
        line-height: 20px;
        font-size: 25px;
    }
    cursor: pointer;
`

export const Main = styled.main`
    padding: 0 15px;

    h1 {
        font-size: 23px;
        line-height: 28px;
    }
    * {
        padding: 15px 0;
    }
    & > p {
        padding: 0;
        color: #6e767d;
    }
`
export const DateOfBirth = styled.div`
    color: #6e767d;
    padding: 0;
    span {
        padding: 0;
        color: #d9d9d9;
    }
`
export const Select = styled.select`
    background: transparent;
    display: block;
    outline: none;
    border-radius: 5px;
    padding: 1.3rem 0.4rem 0.5rem;
    font-size: 17px;
    font-family: inherit;
    option {
        background: #000;
    }
    color: ${({ err }) => `${err ? '#E0245E' : '#6e767d'}`};
    outline: none;
    width: ${({ width }) => width + 'px' || '100%'};
    &:focus + label {
        color: #1a91da;
    }
    &:focus {
        border: 1px solid #1a91da;
    }
    @media screen and (max-width: 600px) {
        width: 100%;
    }
`
export const FormControlSelect = styled.div`
position: relative;
label {
    position: absolute;
    left: 10px;
    user-select none;
    color:${({ err }) => `${err ? '#E0245E' : '#6e767d'}`};
    top: 5px;
    font-size: 13px;
    transition: 0.2s;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
}
@media screen and (max-width: 600px) {
    min-width: 100%;
}
`
