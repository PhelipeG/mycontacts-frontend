import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: flex-start;
  margin-top: 1rem;

  span {
    color: ${({ theme }) => theme.colors.gray[300]};
    margin-left: 1.5rem;
    word-break: break-word;
  }
`;
