import '@atlaskit/css-reset';
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';

import List from '~/components/List';
import { useLists } from '~/context/lists';

const Container = styled.div`
  display: flex;
`;

const Lists = () => {
  const {
    lists,
    listItems,
    listOrder,
    reorderList,
    moveListItem,
    reorderListItem,
  } = useLists();

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

              return (
                <List
                  key={list.id}
                  list={list}
                  listItems={list.listItemIds.map((id) => listItems[id])}
                  index={index}
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
