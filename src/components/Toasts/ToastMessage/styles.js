import styled, { css } from "styled-components";

/**
 *
 * Criando variantes do meu componente do toast message.
 *
 * Uma forma de criar esta variante, seria criar um constante que recebera um objeto com
 * propriedades pertinentes. Neste caso, essas propriedades serão:
 * - default: padrão
 * - success: verde
 * - danger: vermelho
 *
 *
 *
 */

const containerVariant = {
  default: css`
     background-color: ${({ theme }) => theme.colors.primary.main};
  `,
  success: css`
   background-color: ${({ theme }) => theme.colors.success.main};
  `,
  danger: css`
   background-color: ${({ theme }) => theme.colors.danger.main};
  `,
}


export const Container = styled.div`
  padding: 16px 32px;
  color: #fff;

  border-radius: 4px;
  box-shadow: 0px 20px 20px -16px rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  ${({ variant }) => containerVariant[variant] || containerVariant.default}

  & + & {
    margin-top: 12px;
  }

  img {
    margin-right: 8px;
  }

`
