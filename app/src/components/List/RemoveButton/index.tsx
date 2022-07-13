import { useLists } from '~/context/lists';
import { Button } from './styles';

interface Props {
  listId: string;
}

const RemoveButton = ({ listId }: Props) => {
  const { removeList } = useLists();

  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    removeList(listId);
  };

  return <Button onClick={onClick}>X</Button>;
};

export default RemoveButton;
