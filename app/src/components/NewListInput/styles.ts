import styled from 'styled-components';
import { Input as MuiInput } from '@material-ui/core';

export const Input = styled(MuiInput)`
  height: 100%;
  width: 100%;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 32px;
  max-width: 350px;
  margin: 20px auto;
`;
