import styled from 'styled-components';

export const SearchContainer = styled.div`
  width: 100%;

  input {
    background: #fff;
    border: none;
    border-radius: 25px;
    height: 50px;
    width: 100%;
    outline: 0;
    padding: 0 16px;
  }
  &::placeholder {
    color: #bcbcbc;
  }
`;
