import styled from "styled-components";


export default styled.select`
    cursor: pointer;
    width: 100%;
    border: none;
    background: #fff;
    border: 2px solid #fff;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
    height: 52px;
    border-radius: 4px;
    outline: none;
    padding: 0 16px;
    font-size: 16px;
    transition: border-color 0.2s ease-in-out;
    appearance: none;

    &:focus {
        border-color: ${({ theme }) => theme.colors.primary.main};
    }

    // com os colchetes, eh possivel selecionar uma propriedade nativa de uma tag html
    &[disabled] {
        background-color: ${({ theme }) => theme.colors.gray[100]};
        border-color: ${({ theme }) => theme.colors.gray[100]};
    }
`