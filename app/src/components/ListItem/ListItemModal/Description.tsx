import { useState } from 'react';

import { Input } from '@material-ui/core';

interface Props {
  value?: string;
  onSubmit: (value: string) => void;
}

const Description = ({
  value: initialValue,
  onSubmit: onSubmitDescription,
}: Props) => {
  const [value, setValue] = useState(initialValue || '');

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmitDescription(value);
  };

  const onBlur = () => {
    onSubmitDescription(value);
  };

  return (
    <form onSubmit={onSubmit}>
      <Input
        type="text"
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        disableUnderline
        placeholder="Add description"
      />
    </form>
  );
};

export default Description;
