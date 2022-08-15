import { makeStyles } from '@material-ui/core';
import MuiModal from '@material-ui/core/Modal';

interface Props {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
}

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    padding: theme.spacing(1),
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const Modal = ({ children, open, onClose }: Props) => {
  const classes = useStyles();

  return (
    <MuiModal open={open} onClose={onClose} className={classes.modal}>
      <div className={classes.paper}>{children}</div>
    </MuiModal>
  );
};

export default Modal;
