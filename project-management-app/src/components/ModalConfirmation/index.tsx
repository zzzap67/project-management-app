import { ReactElement, Dispatch, SetStateAction } from 'react';
import { createPortal } from 'react-dom';
import { t } from 'i18next';
import './styles.css';

interface IModalConfirmation {
  confirmQuestion: ReactElement;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  onConfirm: () => Promise<void>;
}

function ModalConfirmation({ confirmQuestion, setShowModal, onConfirm }: IModalConfirmation) {
  const closeModal = () => {
    setShowModal(false);
  };

  const handleCallback = () => {
    onConfirm();
    closeModal();
  };

  return createPortal(
    <div className="modal">
      <div className="modalContent">
        <div>{confirmQuestion}</div>
        <div>
          <button className="confirm" onClick={handleCallback}>
            {t('description.forms.okButtonText')}
          </button>
          <button className="cancel" onClick={closeModal}>
            {t('description.forms.cancelButtonText')}
          </button>
        </div>
      </div>
    </div>,
    document.getElementById('modal') as Element
  );
}

export default ModalConfirmation;
