import { useState } from 'react';

import { useLists } from '~/context';

import { Form, Input } from './styles';

const NewListInput = () => {
  const [textFieldValue, setTextFieldValue] = useState('');
  const { addList } = useLists();

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTextFieldValue(event.target.value);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setTextFieldValue('');
    addList(textFieldValue);
  };

  return (
    <Form onSubmit={onSubmit}>
      <Input
        type="text"
        value={textFieldValue}
        onChange={onChange}
        placeholder="Add list"
      />
    </Form>
  );
};

export default NewListInput;
