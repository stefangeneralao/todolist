import { Button } from '@material-ui/core';
import { RemoveButtonContainer } from './styles';

interface Props {
  onSubmit: () => Promise<void>;
}

const RemoveButton = ({ onSubmit }: Props) => (
  <RemoveButtonContainer>
    <Button color="secondary" onClick={onSubmit}>
      Remove
    </Button>
  </RemoveButtonContainer>
);

export default RemoveButton;
