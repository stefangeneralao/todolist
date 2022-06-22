import React from 'react';
import '@atlaskit/css-reset';
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';

import initialData from '~/initial-data';
import List from '~/components/List';
import { InitialData } from '~/types';

const Container = styled.div`
  display: flex;
`;

interface State extends InitialData {}

const App = () => {
  const [state, setState] = React.useState<State>({
    ...initialData,
  });

  const handleListDrop = (result: DropResult) => {
    const { source, destination, draggableId } = result;

    if (!destination) {
      return;
    }

    const newListOrder = Array.from(state.listOrder);
    newListOrder.splice(source.index, 1);
    newListOrder.splice(destination.index, 0, draggableId);

    const newState = { ...state, listOrder: newListOrder };
    setState(newState);
  };

  const reorderListItem = (result: DropResult) => {
    const { source, destination, draggableId } = result;

    if (!destination) {
      return;
    }

    const currentList = state.lists[source.droppableId];

    const currentListItemIds = Array.from(currentList.listItemIds);
    currentListItemIds.splice(source.index, 1);
    currentListItemIds.splice(destination.index, 0, draggableId);

    const newList = {
      ...currentList,
      listItemIds: currentListItemIds,
    };

    const newState = {
      ...state,
      lists: {
        ...state.lists,
        [newList.id]: newList,
      },
    };

    setState(newState);
  };

  const moveListItem = (result: DropResult) => {
    const { source, destination, draggableId } = result;

    if (!destination) {
      return;
    }

    const currentList = state.lists[source.droppableId];
    const previousList = state.lists[destination.droppableId];

    const currentListItemIds = Array.from(currentList.listItemIds);
    currentListItemIds.splice(source.index, 1);
    const newStart = {
      ...currentList,
      listItemIds: currentListItemIds,
    };

    const previousListItemIds = Array.from(previousList.listItemIds);
    previousListItemIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...previousList,
      listItemIds: previousListItemIds,
    };

    const newState = {
      ...state,
      lists: {
        ...state.lists,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };

    setState(newState);
  };

  const handleListItemDrop = (result: DropResult) => {
    const { destination, source } = result;

    if (!destination) {
      return;
    }

    const isDestinationSameList =
      source.droppableId === destination.droppableId;
    if (isDestinationSameList) {
      reorderListItem(result);
    } else {
      moveListItem(result);
    }
  };

  const onDragEnd = (result: DropResult) => {
    const { destination, source, type } = result;

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
      handleListDrop(result);
    }

    if (type === 'listItem') {
      handleListItemDrop(result);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="all-lists" direction="horizontal" type="list">
        {(provided) => (
          <Container {...provided.droppableProps} ref={provided.innerRef}>
            {state.listOrder.map((listId, index) => {
              const list = state.lists[listId];
              const listItems = list.listItemIds.map(
                (listItemId) => state.listItems[listItemId]
              );

              return (
                <List
                  key={list.id}
                  list={list}
                  listItems={listItems}
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

export default App;
