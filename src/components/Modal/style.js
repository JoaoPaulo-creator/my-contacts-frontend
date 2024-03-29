import styled from "styled-components";

export const Overlay = styled.div`
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(5px);
    position: fixed; /* Esse position fixed vai fazer com que o componente ocupe a tela inteira.  Ao utilizar uma position absolute, o componente ocupa somente o que esta visivel na tela no primeiro render, ou seja, ao scrollar a tela, o overlay nao a tampa por completo */
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
`

export const Container = styled.div`
    width: 100%;
    max-width: 450px;
    background: #fff;
    border-radius: 4px;
    padding: 24px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);

    > h1 {
        font-size: 22px;
        color: ${({theme, danger}) => (
            danger ? theme.colors.danger.main : theme.colors.gray[900]
        )};
    }


    .modal-body {
      margin-top: 32px;
    }
`

export const Footer = styled.footer`
    display: flex;
    margin-top: 32px;
    align-items: center;
    justify-content: flex-end;

    .cancel-button {
        background: transparent;
        border: none;
        font-size: 16px;
        margin-right: 24px;
        color: ${({ theme }) => theme.colors.gray[200]}

        &[disabled] {
          cursor: not-allowed;
        }
    }
`
