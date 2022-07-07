import { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { useLists } from '~/context/lists';

import { ListItem as ListItemType } from '~/types';

import { Container, Input } from './styles';

interface Props extends ListItemType {
  index: number;
}

const ListItem = ({ id, content, index }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [textFieldValue, setTextFieldValue] = useState(content);
  const { renameListItem } = useLists();

  const onClick = () => {
    setIsEditing(true);
  };

  const onBlur = () => {
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
        >
          {isEditing ? (
            <form onSubmit={onSubmit}>
              <Input
                type="text"
                value={textFieldValue}
                autoFocus
                onBlur={onBlur}
                onChange={onChange}
              />
            </form>
          ) : (
            <span>{textFieldValue}</span>
          )}
        </Container>
      )}
    </Draggable>
  );
};

export default ListItem;
