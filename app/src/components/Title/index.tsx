import { useState } from 'react';
import { Input, makeStyles } from '@material-ui/core';

interface Props {
  value: string;
  onSubmit: (value: string) => Promise<void>;
}

const useStyles = makeStyles({
  input: {
    fontSize: '1.5rem',
  },
});

const Title = ({ value: initialValue, onSubmit: onSubmitTitle }: Props) => {
  const [value, setValue] = useState(initialValue);

  const classes = useStyles();

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await onSubmitTitle(value);
    } catch {
      setValue(initialValue);
    }
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const onBlur = async () => {
    try {
      await onSubmitTitle(value);
    } catch {
      setValue(initialValue);
    }
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
        placeholder="Add title"
        multiline
        fullWidth
      />
    </form>
  );
};

export default Title;
