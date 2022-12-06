import { Dispatch, SetStateAction, useState, ChangeEvent } from 'react';
import { createPortal } from 'react-dom';
import { t } from 'i18next';
import './styles.css';
import { EItemType } from 'types';

interface IModalEdit {
  ref?: unknown;
  itemType: EItemType;
  isReadOnly: boolean;
  isDescriptionNeeded: boolean;
  title: string;
  description: string;
  setShowModalEdit: Dispatch<SetStateAction<boolean>>;
  onConfirm: (newTitle: string, newDescription: string) => Promise<void>;
}

function ModalEdit({
  itemType,
  isReadOnly,
  isDescriptionNeeded,
  title,
  description,
  setShowModalEdit,
  onConfirm,
}: IModalEdit) {
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewTitle(event.target.value);
  };

  const handleDescriptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewDescription(event.target.value);
  };

  const closeModal = () => {
    setShowModalEdit(false);
  };

  const handleCallback = () => {
    if (!newTitle.trim()) {
      setNewTitle('');
      return;
    }

    if (!newDescription.trim()) {
      setNewDescription('');
      return;
    }

    onConfirm(newTitle, newDescription);
    closeModal();
  };

  return createPortal(
    <div className="modal">
      <div className="modalContent">
        <div className="modal_title">{t(`description.forms.${itemType}`)}</div>
        <div className="modal-input">
          <label className="modal-input__label" htmlFor="titleInput">
            {t('description.forms.inputs.titleLabel')}
          </label>
          <input
            id="titleInput"
            className="title-input modal-input__field"
            onChange={handleTitleChange}
            value={newTitle}
            readOnly={isReadOnly}
            placeholder={t('description.forms.inputs.titlePlaceholder')}
          />
        </div>
        {isDescriptionNeeded && (
          <div className="modal-input">
            <label className="modal-input__label" htmlFor="descriptionInput">
              {t('description.forms.inputs.descriptionLabel')}
            </label>
            <input
              id="descriptionInput"
              className="title-input modal-input__field"
              onChange={handleDescriptionChange}
              value={newDescription}
              readOnly={isReadOnly}
              placeholder={t('description.forms.inputs.descriptionPlaceholder')}
            />
          </div>
        )}
        <div className="modal_button__wrapper">
          <button className="confirm" onClick={handleCallback}>
            {t('description.forms.confirmButtonText')}
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

export default ModalEdit;
