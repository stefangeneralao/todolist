import Modal from '~/components/Modal';

import Description from './Description';
import Title from './Title';

interface Props {
  id: string;
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  onTitleSubmit: (value: string) => void;
  onDescriptionSubmit: (value: string) => void;
}

const ListItemModal = ({
  open,
  title,
  description,
  onClose,
  onTitleSubmit,
  onDescriptionSubmit,
}: Props) => (
  <Modal open={open} onClose={onClose}>
    <div>
      <Title value={title} onSubmit={onTitleSubmit} />
      <Description value={description} onSubmit={onDescriptionSubmit} />
    </div>
  </Modal>
);

export default ListItemModal;
