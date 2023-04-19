import styled from 'styled-components';

export default styled.select`
  width: 100%;
  border: none;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0px 4px 10px rgba(0,0,0,0.04);
  height: 52px;
  border: 0;
  outline: 0;
  padding: 0 16px;
  font-size: 16px;
  margin-top: 0.5rem;
  transition: border-color 0.2s ease-in;
  appearance:none;

  &:focus{
    border-color: 2px solid ${({ theme }) => theme.colors.primary.main}
  }
`;
