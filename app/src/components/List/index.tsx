import { useMemo } from 'react';
import styled from 'styled-components';
import { Droppable, Draggable } from 'react-beautiful-dnd';

import ListItem from '~/components/ListItem';
import { useLists } from '~/context/lists';

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

const ListItemsContainer = styled.div<{ isDraggingOver: boolean }>`
  padding: 8px;
  transition: background-color 0.2s ease;
  background-color: ${(props) => (props.isDraggingOver ? '#e0f7fa' : 'white')};
  flex-grow: 1;
  min-height: 100px;
`;

interface Props {
  id: string;
  index: number;
  title: string;
  listItemIds: string[];
}

const List = ({ id, index, title, listItemIds }: Props) => {
  const { listItems } = useLists();

  return useMemo(
    () => (
      <Draggable draggableId={id} index={index}>
        {(provided) => (
          <Container {...provided.draggableProps} ref={provided.innerRef}>
            <Title {...provided.dragHandleProps}>{title}</Title>
            <Droppable droppableId={id} type="listItem">
              {(provided, snapshot) => (
                <ListItemsContainer
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  isDraggingOver={snapshot.isDraggingOver}
                >
                  {listItemIds
                    .map((listItemId) => listItems[listItemId])
                    .map((listItem, index) => (
                      <ListItem
                        key={listItem.id}
                        id={listItem.id}
                        content={listItem.content}
                        index={index}
                      />
                    ))}
                  {provided.placeholder}
                </ListItemsContainer>
              )}
            </Droppable>
          </Container>
        )}
      </Draggable>
    ),
    [listItemIds, index]
  );
};

export default List;
