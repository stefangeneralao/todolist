import styled from 'styled-components';
import { Typography } from '@material-ui/core';
import { Button as MuiButton } from '@material-ui/core';

export const Button = styled(MuiButton)`
  float: right;
  height: inherit;
`;

export const Container = styled.div<{
  isDragging: boolean;
}>`
  margin: 8px;
  padding: 12px;
  border: 1px solid lightgrey;
  background-color: white;
  border-radius: 2px;

  display: flex;
  flex-direction: column;

  box-shadow: ${(props) =>
    props.isDragging ? `0px 3px 9px #00000033` : `0px 1px 3px #00000000`};
`;

export const Title = styled(Typography)`
  padding: 8px;
`;

export const ListItemsContainer = styled.div<{ isDraggingOver: boolean }>`
  transition: background-color 0.2s ease;
  background-color: ${(props) => (props.isDraggingOver ? '#e0f7fa' : 'white')};
  flex-grow: 1;
  min-height: 100px;
  padding: 16px 8px;
  width: 200px;
`;

export const TopSection = styled.div`
  display: grid;
  grid-template-columns: auto min-content;
  margin-bottom: 12px;
`;

export const TitleContainer = styled.div`
  width: 150px;
`;
