import styled from 'styled-components';

export const Container = styled.div<{ isDragging: boolean }>`
  border: 1px solid lightgrey;
  padding: 8px;
  margin-bottom: 8px;
  border-radius: 2px;
  background-color: white;
  transition: background-color 0.2s ease;
`;
