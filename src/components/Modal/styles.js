import styled, { keyframes, css } from 'styled-components';

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
`;

const scaleIn = keyframes`
  0% {
    transform: scale(0);
  }

  100% {
    transform: scale(1);
  }
`;

const scaleOut = keyframes`
  0% {
    transform: scale(1);
  }

  100% {
    transform: scale(0);
  }
`;

export const Overlay = styled.div`
  background: rgba(0,0,0,0.6);
  backdrop-filter: blur(5px);
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${fadeIn} 0.3s;

  ${({ isLeaving }) => isLeaving && css`animation: ${fadeOut} 0.2s forwards`};
`;
export const Container = styled.div`
  width: 100%;
  max-width: 450px;
  background: #fff;
  padding: 24px;
  border-radius: 4px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.04) ;
  animation: ${scaleIn} 0.3s;

  ${({ isLeaving }) => isLeaving && css`animation: ${scaleOut} 0.2s forwards`};

 > h1{
    font-size: 22px;
    color : ${({ theme, danger }) => (
    danger ? theme.colors.danger.main : theme.colors.gray[900]
  )}
  }
  p{
    margin-top: 8px;
  }
  .modal-body{
    margin-top:32px
  }


`;
export const Footer = styled.footer`
  margin-top: 32px;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  .cancel-button{
    background: transparent;
    border:none;
    font-size: 16px;
    margin-right: 24px;
    color: ${({ theme }) => theme.colors.gray[200]};

    &[disabled]{
      cursor: not-allowed;
    }

  }

`;
