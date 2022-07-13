import styled from 'styled-components';
import { Typography } from '@material-ui/core';

export const Container = styled.div`
  margin: 8px;
  padding: 12px;
  border: 1px solid lightgrey;
  background-color: white;
  border-radius: 2px;
  min-width: 220px;

  display: flex;
  flex-direction: column;
`;

export const Title = styled(Typography)`
  padding: 8px;
`;

export const ListItemsContainer = styled.div<{ isDraggingOver: boolean }>`
  transition: background-color 0.2s ease;
  background-color: ${(props) => (props.isDraggingOver ? '#e0f7fa' : 'white')};
  flex-grow: 1;
  min-height: 100px;
`;

export const TopSection = styled.div`
  display: grid;
  grid-template-columns: auto min-content;
  margin-bottom: 12px;
`;
