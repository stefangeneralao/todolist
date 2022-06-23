import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

import { ListItem as ListItemType } from '~/types';

const Container = styled.div<{ isDragging: boolean }>`
  border: 1px solid lightgrey;
  padding: 8px;
  margin-bottom: 8px;
  border-radius: 2px;
  background-color: white;
  transition: background-color 0.2s ease;
`;

interface Props extends ListItemType {
  index: number;
}

const ListItem = ({ id, content, index }: Props) => (
  <Draggable draggableId={id} index={index}>
    {(provided, snapshot) => (
      <Container
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={provided.innerRef}
        isDragging={snapshot.isDragging}
      >
        {content}
      </Container>
    )}
  </Draggable>
);

export default ListItem;
