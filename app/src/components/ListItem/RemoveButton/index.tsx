import { useLists } from '~/context';
import { Button, Container } from './styles';

interface Props {
  id: string;
}

const RemoveButton = ({ id }: Props) => {
  const { removeListItem } = useLists();

  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    removeListItem(id);
  };

  return (
    <Container>
      <Button onClick={onClick}>X</Button>
    </Container>
  );
};

export default RemoveButton;
