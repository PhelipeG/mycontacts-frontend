import styled, { css } from 'styled-components';

export const StyledButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 16px;
  height: 52px;
  border: 0;
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  border-radius: 4px;
  background: ${({ theme }) => theme.colors.primary.main};
  transition: background 0.2s ease-in;

  &:hover {
    background: ${({ theme }) => theme.colors.primary.light};
  }
  &:active {
    background: ${({ theme }) => theme.colors.primary.dark};
  }
  &:disabled {
    background: #ccc !important;
    cursor: default !important;
  }
  ${({ theme, danger }) => danger
    && css`
      background: ${theme.colors.danger.main};
      &:hover {
        background: ${theme.colors.danger.light};
      }
      &:active {
        background: ${theme.colors.danger.dark};
      }
    `}
`;
