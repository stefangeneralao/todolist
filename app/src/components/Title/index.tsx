import { useState } from 'react';
import { Input, makeStyles, Typography } from '@material-ui/core';

interface Props {
  value: string;
  onSubmit: (value: string) => Promise<void>;
}

const useStyles = makeStyles({
  input: {
    lineHeight: 1.5,
    fontSize: '1.6rem',
    margin: 0,
    padding: 0,
  },
  default: {
    lineHeight: 1.5,
    fontSize: '1.6rem',
    margin: 0,
  },
  root: {
    padding: 0,
  },
});

const Title = ({ value: initialValue, onSubmit: onSubmitTitle }: Props) => {
  const [value, setValue] = useState(initialValue);
  const [isFocus, setIsFocus] = useState(false);

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
      setIsFocus(false);
      await onSubmitTitle(value);
    } catch {
      setValue(initialValue);
    }
  };

  if (isFocus) {
    return (
      <form className={classes.root} onSubmit={onSubmit}>
        <Input
          className={classes.input}
          type="text"
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          disableUnderline
          placeholder="Add title"
          fullWidth
          autoFocus
        />
      </form>
    );
  } else {
    return (
      <Typography className={classes.default} onClick={() => setIsFocus(true)}>
        {value}
      </Typography>
    );
  }
};

export default Title;
