import styled from "styled-components";


export const Container = styled.div`
    margin-top: 32px;
    position: relative;
    margin-bottom: 32px;
    `

export const InputSearchContainer = styled.div`
    width: 100%;

    input {
        width: 100%;
        background: #fff;
        border: none;
        border-radius: 25px;
        height: 50px;
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.4);
        outline: 0;
        padding: 0px 16px;

        &::placeholder {
            color: #bcbcbc;
        }
    }
`
export const Header = styled.header`
    display: flex;
    align-items: center;
    justify-content: ${({ justifyContent }) => justifyContent};
    margin-top: 32px;
    border-bottom: 2px solid ${({ theme }) => theme.colors.gray[100]};
    padding-bottom: 16px;


    strong {
        font-size: 24px;
    }
    a {
        color: ${({ theme }) => theme.colors.primary.main};
        text-decoration: none;
        font-weight: bold;
        border: 2px solid ${({ theme }) => theme.colors.primary.main};
        padding: 8px 16px;
        border-radius: 4px;
        transition: all 0.2s ease-in;
        &:hover {
            background: ${({ theme }) => theme.colors.primary.main};
            color: #fff;
        }
    }
`


export const ListHeader = styled.header`
    margin-top: 24px;
    margin-bottom: 8px;
    button {
        background: transparent;
        border: none;
        display: flex;
        align-items: center;
    }

    span {
        margin-right: 8px;
        font-weight: bold;
        color: ${({ theme }) => theme.colors.primary.main};
    }

    img {
        transform: ${({ orderBy }) => orderBy === 'asc' ? 'rotate(180deg)' : 'rotate(0deg)'};
        transition: transform 0.2s; // serve para criar transições fluidas ('animações')
    }

`


export const Card = styled.div`
    background: #fff;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
    padding: 16px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    /**
    Se houver dois elementos em sequencia, será aplicada a regra de margem com X pixels (nesse caso).
    Exemplo: Se houver um card em cima de outro card, o margin-top vai ser de 16px,
    se não, vai ser de 8px, que é o valor aplicado no margin-bottom do header do ListContainer.
    É para isso que serve o & + &
    */
    & + & {
        margin-top: 16px;
    }
    .info {
        .contact-name {
            display: flex;
            align-items: center;
            small {
                background: ${({ theme }) => theme.colors.primary.lighter};
                color: ${({ theme }) => theme.colors.primary.main};
                font-weight: bold;
                text-transform: uppercase;
                padding: 4px;
                border-radius: 4px;
                margin-left: 8px;
            }
        }
        span {
            display: block;
            font-size: 14px;
            color: ${({ theme }) => theme.colors.gray[200]}
        }
    }
    .actions {
        display: flex;
        align-items: center;
        button {
            background: transparent;
            border: none;
            margin-left: 8px;
        }
    }
`

export const ErrorContainer = styled.div`
    margin-top: 16px;
    display: flex;
    align-items: center;

    .details {
        margin-left: 24px;

        strong {
            font-size: 22px;
            color: ${({ theme }) => theme.colors.danger.main};
            display: block; // usado para quebrar uma linha
            margin-bottom: 8px;
        }
    }

`

export const EmptyListContainer = styled.div`
    margin-top: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;

    p {
        color: ${({ theme }) => theme.colors.gray[200]};
        text-align: center;
        margin-top: 8px;

        strong {
            color: ${({ theme }) => theme.colors.primary.main};
        }
    }
`


export const SearchNotFoundContainer = styled.div`
    margin-top: 16px;
    display: flex;
    align-items: flex-start;


    img {
        space-between: 24px;
    }

    span {
        margin-left: 24px;
        color: ${({ theme }) => theme.colors.gray[200]};
        align-items: center;
        word-break: break-word;
    }
`