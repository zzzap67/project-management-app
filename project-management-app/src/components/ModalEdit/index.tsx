import { Dispatch, SetStateAction, useState, ChangeEvent } from 'react';
import { createPortal } from 'react-dom';
import { t } from 'i18next';
import './styles.css';
import { EItemType } from 'types';

interface IModalEdit {
  itemType: EItemType;
  isReadOnly: boolean;
  isDescriptionNeeded: boolean;
  id: string;
  title: string;
  description: string;
  setShowModalEdit: Dispatch<SetStateAction<boolean>>;
  onConfirm: (newTitle: string, newDescription: string) => Promise<void>;
}

function ModalEdit({
  itemType,
  isReadOnly,
  isDescriptionNeeded,
  id,
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
    onConfirm(newTitle, newDescription);
    closeModal();
  };

  return createPortal(
    <div className="modal">
      <div className="modalContent">
        <div>{t(`description.forms.${itemType}`)}</div>
        <div>
          <label htmlFor="titleInput">{t('description.forms.inputs.titleLabel')}</label>
          <input
            id="titleInput"
            className="title-input"
            onChange={handleTitleChange}
            value={newTitle}
            readOnly={isReadOnly}
          />
        </div>
        {isDescriptionNeeded && (
          <div>
            <label htmlFor="descriptionInput">
              {t('description.forms.inputs.descriptionLabel')}
            </label>
            <input
              id="descriptionInput"
              className="title-input"
              onChange={handleDescriptionChange}
              value={newDescription}
              readOnly={isReadOnly}
            />
          </div>
        )}
        <div>
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
