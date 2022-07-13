import { useState } from 'react';
import { useLists } from '~/context/lists';
import { Input } from './styles';

interface Props {
  listId: string;
}

const NewlistItemInput = ({ listId }: Props) => {
  const [textFieldValue, setTextFieldValue] = useState('');
  const { addListItem } = useLists();

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTextFieldValue(event.target.value);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setTextFieldValue('');
    addListItem(listId, textFieldValue);
  };

  return (
    <form onSubmit={onSubmit}>
      <Input
        type="text"
        placeholder="+ List item"
        value={textFieldValue}
        onChange={onChange}
      />
    </form>
  );
};

export default NewlistItemInput;
