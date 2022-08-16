import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';

import { useLists } from '~/context';

import { Button } from './styles';

interface Props {
  listId: string;
  show: boolean;
}

const RemoveButton = ({ listId, show }: Props) => {
  const { removeList } = useLists();

  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    removeList(listId);
  };

  if (!show) return null;

  return (
    <Button onClick={onClick}>
      <DeleteOutlinedIcon />
    </Button>
  );
};

export default RemoveButton;
