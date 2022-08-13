import { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Typography } from '@material-ui/core';

import { useLists } from '~/context/lists';
import { ListItem as ListItemType } from '~/types';

import RemoveButton from './RemoveButton';
import { Container, Input, ListItemContainer, ListItemTitle } from './styles';

interface Props extends ListItemType {
  index: number;
}

const ListItem = ({ id, content, index }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [textFieldValue, setTextFieldValue] = useState(content);
  const [showRemoveButton, setShowRemoveButton] = useState(false);

  const { renameListItem } = useLists();

  const onClick = () => {
    setIsEditing(true);
  };

  const onBlur = () => {
    setIsEditing(false);
    renameListItem(id, textFieldValue);
    setIsEditing(false);
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTextFieldValue(event.target.value);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    renameListItem(id, textFieldValue);
    setIsEditing(false);
  };

  const onMouseOver = () => setShowRemoveButton(true);

  const onMouseLeave = () => setShowRemoveButton(false);

  return (
    <Draggable draggableId={id} index={index}>
      {(provided, snapshot) => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
          onClick={onClick}
          isEditing={isEditing}
          onMouseOver={onMouseOver}
          onMouseLeave={onMouseLeave}
        >
          {isEditing ? (
            <form onSubmit={onSubmit}>
              <Input
                type="text"
                value={textFieldValue}
                onBlur={onBlur}
                onChange={onChange}
                autoFocus
                disableUnderline
              />
            </form>
          ) : (
            <>
              <ListItemContainer>
                <ListItemTitle>{textFieldValue}</ListItemTitle>
                {showRemoveButton && !isEditing && <RemoveButton id={id} />}
              </ListItemContainer>
            </>
          )}
        </Container>
      )}
    </Draggable>
  );
};

export default ListItem;
