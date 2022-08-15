import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd';

import List from '~/components/List';
import { useLists } from '~/context';

import { Container } from './styles';

const Lists = () => {
  const { lists, listOrder, reorderList, moveListItem, reorderListItem } =
    useLists();

  const onDragEnd = (result: DropResult) => {
    const { destination, source, type, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === 'list') {
      reorderList({ source, destination, draggableId });
    }

    if (type === 'listItem') {
      const isListReordering = source.droppableId === destination.droppableId;

      if (isListReordering) {
        reorderListItem({ source, destination, draggableId });
      } else {
        moveListItem({ source, destination, draggableId });
      }
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="all-lists" direction="horizontal" type="list">
        {(provided) => (
          <Container {...provided.droppableProps} ref={provided.innerRef}>
            {listOrder.map((listId, index) => {
              const list = lists[listId];
              if (!list) return;

              return (
                <List
                  key={list.id}
                  id={list.id}
                  index={index}
                  title={list.title}
                  listItemIds={list.listItemIds}
                />
              );
            })}
            {provided.placeholder}
          </Container>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Lists;
