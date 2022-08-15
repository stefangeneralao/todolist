import { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';

import { useLists } from '~/context/lists';
import { ListItem as ListItemType } from '~/types';

import RemoveButton from './RemoveButton';
import Modal from './ListItemModal';
import { Container, Input, ListItemContainer, ListItemTitle } from './styles';

interface Props extends ListItemType {
  index: number;
}

const ListItem = ({ id, content, index }: Props) => {
  const [listItemTitle, setListItemTitle] = useState(content);
  const [showRemoveButton, setShowRemoveButton] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { renameListItem } = useLists();

  const onClick = () => {
    setIsModalOpen(true);
  };

  const onMouseOver = () => setShowRemoveButton(true);

  const onMouseLeave = () => setShowRemoveButton(false);

  const onTitleSubmit = (value: string) => {
    renameListItem(id, value);
    setListItemTitle(value);
  };

  return (
    <>
      <Draggable draggableId={id} index={index}>
        {(provided, snapshot) => (
          <Container
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
            onClick={onClick}
            onMouseOver={onMouseOver}
            onMouseLeave={onMouseLeave}
          >
            <ListItemContainer>
              <ListItemTitle>{listItemTitle}</ListItemTitle>
              {showRemoveButton && <RemoveButton id={id} />}
            </ListItemContainer>
          </Container>
        )}
      </Draggable>

      <Modal
        id={id}
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={listItemTitle}
        onTitleSubmit={onTitleSubmit}
      />
    </>
  );
};

export default ListItem;
