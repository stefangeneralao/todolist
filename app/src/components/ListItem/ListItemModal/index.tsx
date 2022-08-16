import Modal from '~/components/Modal';

import Description from './Description';
import RemoveButton from './RemoveButton';
import Title from './Title';

interface Props {
  id: string;
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  onTitleSubmit: (value: string) => Promise<void>;
  onDescriptionSubmit: (value: string) => Promise<void>;
  onListItemRemove: () => Promise<void>;
}

const ListItemModal = ({
  open,
  title,
  description,
  onClose,
  onTitleSubmit,
  onDescriptionSubmit,
  onListItemRemove,
}: Props) => (
  <Modal open={open} onClose={onClose}>
    <div>
      <Title value={title} onSubmit={onTitleSubmit} />
      <Description value={description} onSubmit={onDescriptionSubmit} />
      <RemoveButton onSubmit={onListItemRemove} />
    </div>
  </Modal>
);

export default ListItemModal;
