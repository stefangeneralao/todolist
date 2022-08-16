import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  overflow-x: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`;
