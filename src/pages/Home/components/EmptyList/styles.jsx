import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1rem;

  p {
    color: ${({ theme }) => theme.colors.gray[300]};
    text-align: center;
    margin-top: 0.5rem;

    strong {
      color: ${({ theme }) => theme.colors.primary[500]};
    }
  }
`;
