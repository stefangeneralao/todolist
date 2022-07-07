import { useLists } from '~/context/lists';
import { Container } from './styles';

interface Props {
  id: string;
}

const RemoveButton = ({ id }: Props) => {
  const { removeListItem } = useLists();

  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    removeListItem(id);
  };

  return <Container onClick={onClick}>X</Container>;
};

export default RemoveButton;
