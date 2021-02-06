import styled from 'styled-components'

const Button = styled.button`
    /* our styles go here */
    display: block;
    padding: 10px;
    border: none;
    border-radius: 5px;
    font-size: 18px;
    color: #fff;
    background-color: #0077cc;
    cursor: pointer;

    :hover {
        opacity: 0.8;
    }

    :active {
        background-color: #0057a3;
    }
`
export default Button