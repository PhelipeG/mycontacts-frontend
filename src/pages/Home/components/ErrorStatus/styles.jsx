import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1rem;

  .details {
    margin-left: 1.5rem;

    strong {
      color: ${({ theme }) => theme.colors.danger[500]};
      font-size: 1.375rem;
      margin-bottom: 0.5rem;
      display: block;
    }
  }
`;
