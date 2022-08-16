import styled from 'styled-components';
import { Typography } from '@material-ui/core';

export const Container = styled.div<{
  isDragging: boolean;
}>`
  position: relative;

  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 30px;
  width: 100%;

  box-sizing: border-box;

  padding: 24px 12px;

  margin-bottom: 12px;
  border-radius: 2px;
  background-color: white;
  transition: background-color 0.2s ease;
  box-shadow: ${(props) =>
    props.isDragging ? `0px 3px 9px #00000033` : `0px 1px 3px #00000033`};
`;

export const ListItemTitle = styled(Typography)`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 100%;
`;

export const ListItemContainer = styled.div`
  /* position: relative; */
`;
