import { useState } from 'react';

import { Input, makeStyles } from '@material-ui/core';

interface Props {
  value: string;
  onSubmit: (value: string) => void;
}

const useStyles = makeStyles({
  input: {
    width: '100%',
    fontSize: '1.5rem',
  },
});

const Title = ({ value: initialValue, onSubmit: onSubmitTitle }: Props) => {
  const [value, setValue] = useState(initialValue);
  const classes = useStyles();

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
      <Input
        className={classes.input}
        type="text"
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        disableUnderline
      />
    </form>
  );
};

export default Title;