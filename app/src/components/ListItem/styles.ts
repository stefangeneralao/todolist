import styled from 'styled-components';

export const Container = styled.div<{
  isDragging: boolean;
  isEditing: boolean;
}>`
  border: 1px solid lightgrey;
  padding: 8px;
  margin-bottom: 8px;
  border-radius: 2px;
  background-color: white;
  transition: background-color 0.2s ease;
  box-shadow: ${({ isDragging, isEditing }) => {
    if (isDragging) {
      return '0px 3px 10px #00000022';
    }
    if (isEditing) {
      return '0px 0px 10px #00cccc77';
    }
    return 'none';
  }};
`;

export const Input = styled.input`
  border: 0;
  font-family: inherit;
  font-size: inherit;
  padding: 0;

  &:focus {
    outline: none;
  }
`;
