import styled from 'styled-components';
import { Input as MuiInput, Typography } from '@material-ui/core';

export const Container = styled.div<{
  isDragging: boolean;
  isEditing: boolean;
}>`
  ${({ isDragging, isEditing }) => `
    display: grid;
    height: 30px;
    grid-template-columns: 1fr auto;
    padding: 8px;
    margin-bottom: 8px;
    border-radius: 2px;
    background-color: white;
    transition: background-color 0.2s ease;
    box-shadow: ${
      isDragging
        ? `0px 3px 9px #00000033`
        : isEditing
        ? `0px 0px 10px #00cccc77`
        : `0px 1px 3px #00000033`
    }
  `}
`;

export const Input = styled(MuiInput)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
`;

export const ListItemTitle = styled(Typography)``;

export const ListItemContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  width: 100%;
`;
