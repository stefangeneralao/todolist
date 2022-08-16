import { useMemo, useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';

import { useLists } from '~/context';
import { ListItem as ListItemType } from '/types';

import RemoveButton from './RemoveButton';
import Modal from './ListItemModal';
import { Container, ListItemContainer, ListItemTitle } from './styles';

interface Props extends ListItemType {
  index: number;
}

const ListItem = ({ id, title, description, index }: Props) => {
  const [showRemoveButton, setShowRemoveButton] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { setListItemTitle, setListItemDescription, removeListItem } =
    useLists();

  const onClick = () => {
    setIsModalOpen(true);
  };

  const onMouseOver = () => setShowRemoveButton(true);

  const onMouseLeave = () => setShowRemoveButton(false);

  const onTitleSubmit = async (value: string) => {
    await setListItemTitle(id, value);
  };

  const onDescriptionSubmit = async (value: string) => {
    await setListItemDescription(id, value);
  };

  const onListItemRemove = async () => {
    await removeListItem(id);
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
        onListItemRemove={onListItemRemove}
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
            <div>
              <ListItemTitle>{title}</ListItemTitle>
              {showRemoveButton && <RemoveButton id={id} />}
            </div>
          </Container>
        )}
      </Draggable>

      {memoizedModal}
    </>
  );
};

export default ListItem;
