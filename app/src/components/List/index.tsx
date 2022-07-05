import { useMemo } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';

import ListItem from '~/components/ListItem';
import NewlistItemInput from '~/components/NewListItemInput';
import { useLists } from '~/context/lists';

import { Container, ListItemsContainer, Title } from './styles';

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
                  <NewlistItemInput listId={id} />
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
