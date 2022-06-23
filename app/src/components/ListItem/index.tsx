import { Draggable } from 'react-beautiful-dnd';

import { ListItem as ListItemType } from '~/types';

import { Container } from './styles';

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
