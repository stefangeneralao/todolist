import Modal from '~/components/Modal';

import Title from './Title';

interface Props {
  id: string;
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  onTitleSubmit: (value: string) => void;
}

const ListItemModal = ({
  open,
  onClose,
  title,
  description,
  onTitleSubmit,
}: Props) => {
  return (
    <Modal open={open} onClose={onClose}>
      <div>
        <Title value={title} onSubmit={onTitleSubmit} />
        <p>{description}</p>
      </div>
    </Modal>
  );
};

export default ListItemModal;
