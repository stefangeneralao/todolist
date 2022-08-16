import styled from 'styled-components';
import { Button as MuiButton } from '@material-ui/core';

export const Button = styled(MuiButton)`
  height: 75%;
`;

export const Container = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  right: 0;
  top: 0;
  background-color: white;
`;
