import styled from 'styled-components';

export const Input = styled.input`
  border: 0;
  font-size: 1rem;
  width: 100%;

  ::placeholder {
    color: black;
  }
`;

export const Form = styled.form`
  display: grid;
  grid-template-columns: min-content auto;
`;
