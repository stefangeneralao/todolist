import { useMemo, useState } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';

import ListItem from '~/components/ListItem';
import NewlistItemInput from '~/components/NewListItemInput';
import { useLists } from '~/context';

import RemoveButton from './RemoveButton';
import {
  Container,
  ListItemsContainer,
  Title,
  TopSection as StyledTopSection,
} from './styles';

interface Props {
  id: string;
  index: number;
  title: string;
  listItemIds: string[];
}

const List = ({ id, index, title, listItemIds }: Props) => {
  const { listItems } = useLists();
  const [showActions, setShowActions] = useState(false);

  const onMouseOver = () => setShowActions(true);

  const onMouseLeave = () => setShowActions(false);

  const ListItems = useMemo(() => {
    return listItemIds.map((listItemId, index) => {
      const listItem = listItems[listItemId];

      if (!listItem) return;

      return (
        <ListItem
          key={listItemId}
          id={listItemId}
          title={listItem.title}
          description={listItem.description}
          index={index}
        />
      );
    });
  }, [listItemIds, listItems]);

  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <Container
          {...provided.draggableProps}
          ref={provided.innerRef}
          onMouseOver={onMouseOver}
          onMouseLeave={onMouseLeave}
        >
          <StyledTopSection>
            <Title variant="h3" {...provided.dragHandleProps}>
              {title}
            </Title>
            {showActions && <RemoveButton listId={id} />}
          </StyledTopSection>
          <Droppable droppableId={id} type="listItem">
            {(provided, snapshot) => (
              <ListItemsContainer
                ref={provided.innerRef}
                {...provided.droppableProps}
                isDraggingOver={snapshot.isDraggingOver}
              >
                {ListItems}
                {provided.placeholder}
              </ListItemsContainer>
            )}
          </Droppable>
          <NewlistItemInput listId={id} />
        </Container>
      )}
    </Draggable>
  );
};

export default List;
