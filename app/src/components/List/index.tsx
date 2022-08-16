import { useMemo, useState } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';

import ListItem from '~/components/ListItem';
import NewlistItemInput from '~/components/NewListItemInput';
import Title from '~/components/Title';

import { useLists } from '~/context';

import RemoveButton from './RemoveButton';
import {
  Container,
  ListItemsContainer,
  TopSection as StyledTopSection,
  TitleContainer,
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

  const { setListTitle } = useLists();

  const isMobile = 'ontouchstart' in document.documentElement;

  const onMouseOver = () => setShowActions(true);

  const onMouseLeave = () => setShowActions(false);

  const onTitleSubmit = async (value: string) => {
    await setListTitle(id, value);
  };

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
            <TitleContainer {...provided.dragHandleProps}>
              <Title value={title} onSubmit={onTitleSubmit} />
            </TitleContainer>
            <div>
              <RemoveButton listId={id} show={isMobile || showActions} />
            </div>
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
