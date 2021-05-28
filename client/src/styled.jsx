import styled, { css } from 'styled-components'

export const Button = styled.button`
    ${({ disabled }) =>
        disabled &&
        css`
            background-color: #0e5079 !important;
            color: #7f7f7f !important;
            cursor: not-allowed !important;
        `}
    cursor: pointer;
    padding: ${({ pad }) => pad || '1em 0'} !important;
    font-family: inherit;
    font-weight: ${({ fw }) => fw || '400'};
    margin: ${({ marg }) => marg || '0'};
    background-color: ${({ bgc }) => bgc || '#1da1f2'};
    border: none;
    color: ${({ color }) => color || '#fff'};
    border-radius: 25px;
    width: ${({ width }) => width || '100%'};
    max-width: ${({ maxWidth }) => maxWidth || '100%'};
    text-overflow: ellipsis;
    border: ${({ bc }) => '1px solid ' + bc || 'none'};
    white-space: nowrap;
    overflow: hidden;
    ${({ hover }) =>
        hover &&
        css`
            transition: background-color 0.5s;
            &:hover {
                background-color: rgb(26, 145, 218);
            }
        `}

    ${({ zIndex }) =>
        zIndex &&
        css`
            z-index: ${zIndex};
        `}
    ${({ height }) =>
        height &&
        css`
            height: ${height};
        `}
${({ pos }) =>
        pos &&
        css`
            position: ${pos};
        `}
${({ left }) =>
        left &&
        css`
            left: ${left};
        `}
${({ top }) =>
        top &&
        css`
            top: ${top};
        `}
${({ right }) =>
        right &&
        css`
            right: ${right};
        `}
`

export const LinkS = styled.div`
    margin: ${({ marg }) => marg || 'inherit'};
    background-color: ${({ bgc }) => bgc || 'none'};
    padding: ${({ pad }) => pad || '0'} !important;
    display: flex;
    justify-content: center;
    transition: background-color 0.5s;
    max-width: ${({ maxWidth }) => maxWidth || '100%'};
    span {
        color: ${({ color }) => color || '#fff'};
        font-weight: 700;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }
    border-radius: 25px;
    cursor: pointer;
    border: ${({ borderColor }) =>
        borderColor ? '1px solid ' + borderColor : 'none'};
    @media screen and (max-width: 1000px) {
        min-width: 190px;
    }
    @media screen and (max-width: 550px) {
        min-width: 100%;
        margin: 0;
    }
`

export const Flex = styled.div`
    padding: ${({ pad }) => pad || '0'}!important;
    display: flex;
    width: ${({ width }) => width || '100%'};
    color: ${({ color }) => color || '#fff'};
    flex-wrap: ${({ wr }) => wr || 'wrap'};
    height: ${({ height }) => height || '100%'};

    ${({ boxSh }) =>
        boxSh &&
        css`
            box-shadow: ${boxSh};
        `}
    ${({ outline }) =>
        outline &&
        css`
            outline: ${outline};
        `}
    ${({ borRad }) =>
        borRad &&
        css`
            border-radius: ${borRad};
        `}
    ${({ zIndex }) =>
        zIndex &&
        css`
            z-index: ${zIndex};
        `}

    ${({ marg }) =>
        marg &&
        css`
            margin: ${marg};
        `}
        ${({ us }) =>
        us &&
        css`
            user-select: ${us};
        `}
        ${({ border }) =>
        border &&
        css`
            border: ${border};
        `}
        ${({ borderRight }) =>
        borderRight &&
        css`
            border-right: ${borderRight};
        `}
        ${({ borderLeft }) =>
        borderLeft &&
        css`
            border-left: ${borderLeft};
        `}
    justify-content: ${({ jc }) => jc || 'unset'};
    align-items: ${({ ai }) => ai || 'unset'};
    ${({ pos }) =>
        pos &&
        css`
            position: ${pos};
        `}

    ${({ media }) =>
        media &&
        css`
            @media screen and (max-width: 1000px) {
                flex-direction: row-reverse;
            }
        `}
`

export const FormControl = styled.div`
    position: relative;
    width: ${({ width }) => width || '100%'};
    padding: ${({ pad }) => pad || 'auto'};
    margin: ${({ marg }) => marg || 'inherit'};
    input {
        display: block;
        outline: none;
        width: 100%;
        border-radius: 5px;
        background: transparent;
        border: ${({ err }) => `1px solid ${err ? '#E0245E' : '#6e767d'}`};
        padding: 1.3rem 0.4rem 0.5rem;
        font-size: 17px;
        color: #d9d9d9;
        font-family: inherit;
    }
    textarea{
        display: block;
        height: ${({ height }) => height || 'auto'} !important;
        outline: none;
        resize: none;
        width: 100% !important;
        border-radius: 5px;
        background: transparent;
        border: ${({ err }) => `1px solid ${err ? '#E0245E' : '#6e767d'}`};
        padding:1.7rem 0.4rem 0.5rem;
        font-size: 17px;
        color: #d9d9d9;
        font-family: inherit;
    }
    label {
        position: absolute;
        left: 8px;
        user-select none;
        color: #6e767d;
        top: 14px;
        font-size: 17px;
        transition: 0.2s;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        cursor: text;
    }
    input:valid + label,
    input:focus + label,
    textarea:valid + label,
    textarea:focus + label{
        top:5px;
        color:${({ err }) => `${err ? '#E0245E' : '#6e767d'}`};
        font-size: 13px;
    }
    textarea:focus{
        border: 1px solid #1a91da;
    }
    input:focus + label, 
    textarea:focus + label {
        color: ${({ err }) => `${err ? '#E0245E' : '#1a91da'}`};
    }
    ${({ err }) =>
        !err &&
        css`
            input:focus {
                border: 1px solid #1a91da;
            }
        `}
        span{
            padding:0;
            color: #E0245E;
            font-size: 13px;
            line-height: 16px;
            position: absolute;
        }
    
`
export const Alert = styled.div`
    color: #0f1419;
    line-height: 20px;
    min-height: 20px;
    text-align: center;
    margin: ${({ marg }) => marg || 'inherit'};
    border-radius: 10px;
    padding: 0.9rem !important;
    background-color: ${({ severity }) =>
        severity === 'error' ? 'rgb(255, 210, 218)' : 'rgb(183, 223, 185)'};
`
export const Padding = styled.div`
    padding: ${({ pad }) => pad || 'auto'} !important;
`
export const Img = styled.img`
    padding: 0 !important;
    object-fit: cover;
    ${({ boxSh }) =>
        boxSh &&
        css`
            box-shadow: ${boxSh};
        `}
    ${({ border }) =>
        border &&
        css`
            border: ${border};
        `}
    width: ${({ width }) => width || 'auto'};
    opacity: ${({ opacity }) => opacity || '1'};
    ${({ zIndex }) =>
        zIndex &&
        css`
            z-index: ${zIndex};
        `}
    ${({ height }) =>
        height &&
        css`
            height: ${({ height }) => height};
        `}
    ${({ borRad }) =>
        borRad &&
        css`
            border-radius: ${borRad};
        `}
    ${({ pos }) =>
        pos &&
        css`
            position: ${pos};
        `}
    ${({ left }) =>
        left &&
        css`
            left: ${left};
        `}
    ${({ top }) =>
        top &&
        css`
            top: ${top};
        `}
    ${({ right }) =>
        right &&
        css`
            right: ${right};
        `}
    ${({ bottom }) =>
        bottom &&
        css`
            bottom: ${bottom};
        `}
`
export const Icons = styled.div`
    &:hover {
        background-color: rgba(255, 255, 255, 0.1);
    }
    cursor: pointer;
    border-radius: 100%;
    display: flex;
    transition-duration: 0.5s;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    svg {
        cursor: pointer;
        font-size: ${({ fz }) => fz || '25px'};
        height: ${({ height }) => height || 'auto'} !important;
        color: ${({ color }) => color || '#fff'} !important;
    }
    ${({ marg }) =>
        marg &&
        css`
            margin: ${marg};
        `}
    ${({ us }) =>
        us &&
        css`
            user-select: ${us};
        `}

    ${({ zIndex }) =>
        zIndex &&
        css`
            z-index: ${zIndex};
        `}
    ${({ pos }) =>
        pos &&
        css`
            position: ${pos};
        `}
${({ left }) =>
        left &&
        css`
            left: ${left};
        `}
${({ top }) =>
        top &&
        css`
            top: ${top};
        `}
${({ right }) =>
        right &&
        css`
            right: ${right};
        `}
${({ bottom }) =>
        bottom &&
        css`
            bottom: ${bottom};
        `}
`
