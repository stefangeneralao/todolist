import { useState } from 'react';

import { Input } from '@material-ui/core';

interface Props {
  value: string;
  onSubmit: (value: string) => void;
}

const Title = ({ value: initialValue, onSubmit: onSubmitTitle }: Props) => {
  const [value, setValue] = useState(initialValue);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmitTitle(value);
  };

  const onBlur = () => {
    onSubmitTitle(value);
  };

  return (
    <form onSubmit={onSubmit}>
      <Input type="text" value={value} onChange={onChange} onBlur={onBlur} />
    </form>
  );
};

export default Title;
