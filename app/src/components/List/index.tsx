import React from 'react';
import styled from 'styled-components';
import { Droppable, Draggable } from 'react-beautiful-dnd';

import { Column as ColumnType, ListItem as ListItemType } from '~/types';
import ListItem from '~/components/ListItem';

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  background-color: white;
  border-radius: 2px;
  min-width: 220px;

  display: flex;
  flex-direction: column;
`;

const Title = styled.h3`
  padding: 8px;
`;

const ListItems = styled.div<{ isDraggingOver: boolean }>`
  padding: 8px;
  transition: background-color 0.2s ease;
  background-color: ${(props) => (props.isDraggingOver ? '#e0f7fa' : 'white')};
  flex-grow: 1;
  min-height: 100px;
`;

interface Props {
  column: ColumnType;
  listItems: ListItemType[];
  index: number;
}

const List = ({ column, listItems, index }: Props) => {
  return (
    <Draggable draggableId={column.id} index={index}>
      {(provided) => (
        <Container {...provided.draggableProps} ref={provided.innerRef}>
          <Title {...provided.dragHandleProps}>{column.title}</Title>
          <Droppable droppableId={column.id} type="task">
            {(provided, snapshot) => (
              <ListItems
                ref={provided.innerRef}
                {...provided.droppableProps}
                isDraggingOver={snapshot.isDraggingOver}
              >
                {listItems.map((task, index) => (
                  <ListItem
                    key={task.id}
                    id={task.id}
                    content={task.content}
                    index={index}
                  />
                ))}
                {provided.placeholder}
              </ListItems>
            )}
          </Droppable>
        </Container>
      )}
    </Draggable>
  );
};

export default List;
