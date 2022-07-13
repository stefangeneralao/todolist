import { useLists } from '~/context/lists';
import { Button } from './styles';

interface Props {
  id: string;
}

const RemoveButton = ({ id }: Props) => {
  const { removeListItem } = useLists();

  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    removeListItem(id);
  };

  return <Button onClick={onClick}>X</Button>;
};

export default RemoveButton;
