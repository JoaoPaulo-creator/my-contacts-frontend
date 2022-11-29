import { createGlobalStyle } from "styled-components";


export default createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Sora', sans-serif;

    }

    body {
        // acessando um tema criado atráves das props
        background: ${({ theme }) => theme.colors.background};
        font-size: 16px;

        //sempre que uma chave é uma numeral, é necessário coloca-la em um [] quando for chama-la
        color: ${({ theme }) => theme.colors.gray[900]};
    }

    button {
        cursor: pointer;
    }


`