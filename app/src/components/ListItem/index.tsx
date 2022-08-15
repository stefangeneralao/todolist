import { useMemo, useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';

import { useLists } from '~/context/lists';
import { ListItem as ListItemType } from '~/types';

import RemoveButton from './RemoveButton';
import Modal from './ListItemModal';
import { Container, Input, ListItemContainer, ListItemTitle } from './styles';

interface Props extends ListItemType {
  index: number;
}

const ListItem = ({ id, title, description, index }: Props) => {
  const [showRemoveButton, setShowRemoveButton] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { setListItemTitle, setListItemDescription } = useLists();

  const onClick = () => {
    setIsModalOpen(true);
  };

  const onMouseOver = () => setShowRemoveButton(true);

  const onMouseLeave = () => setShowRemoveButton(false);

  const onTitleSubmit = (value: string) => {
    setListItemTitle(id, value);
  };

  const onDescriptionSubmit = (value: string) => {
    setListItemDescription(id, value);
  };

  const memoizedModal = useMemo(
    () => (
      <Modal
        id={id}
        open={isModalOpen}
        title={title}
        description={description}
        onClose={() => setIsModalOpen(false)}
        onTitleSubmit={onTitleSubmit}
        onDescriptionSubmit={onDescriptionSubmit}
      />
    ),
    [isModalOpen, title, description]
  );

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
              <ListItemTitle>{title}</ListItemTitle>
              {showRemoveButton && <RemoveButton id={id} />}
            </ListItemContainer>
          </Container>
        )}
      </Draggable>

      {memoizedModal}
    </>
  );
};

export default ListItem;
