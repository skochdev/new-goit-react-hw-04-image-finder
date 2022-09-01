import styled from 'styled-components/macro';

export const Spinner = styled.div`animation: spinner 2s infinite cubic-bezier(0, 0.5, 1, 0.5);
  display: flex;
  justify-content: center;
  margin-top: 30vh;
  margin-left: auto;
  margin-right: auto;
  
  @keyframes spinner {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
`;
