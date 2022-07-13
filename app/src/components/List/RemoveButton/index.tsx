import { useLists } from '~/context/lists';
import { Container } from './styles';

interface Props {
  listId: string;
}

const RemoveButton = ({ listId }: Props) => {
  const { removeList } = useLists();

  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    removeList(listId);
  };

  return <Container onClick={onClick}>X</Container>;
};

export default RemoveButton;
