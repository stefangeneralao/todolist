import { useState } from 'react';

import { Input } from '@material-ui/core';

interface Props {
  value?: string;
  onSubmit: (value: string) => Promise<void>;
}

const Description = ({
  value: initialValue,
  onSubmit: onSubmitDescription,
}: Props) => {
  const [value, setValue] = useState(initialValue || '');

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await onSubmitDescription(value);
    } catch {
      setValue(initialValue || '');
    }
  };

  const onBlur = async () => {
    try {
      await onSubmitDescription(value);
    } catch {
      setValue(initialValue || '');
    }
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
