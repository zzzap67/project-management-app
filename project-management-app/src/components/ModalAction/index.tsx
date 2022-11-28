import { Dispatch, SetStateAction, useState, ChangeEvent } from 'react';
import { createPortal } from 'react-dom';
import { t } from 'i18next';
import './styles.css';
import { EItemType } from 'types';
import Form from 'components/Form';
import { ru } from 'components/locales/ru';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'store/hooks';
import { createNewBoardThunk } from 'store/thunks';

interface IModalAction {
  formType: EItemType;
  isReadOnly: boolean;
  isDescriptionNeeded: boolean;
  id: string;
  title: string;
  description: string;
  setShowModalAction: Dispatch<SetStateAction<boolean>>;
  onSubmit: (values: Record<string, string>) => Promise<void>;
}

function ModalAction({
  formType,
  isReadOnly,
  isDescriptionNeeded,
  id,
  title,
  description,
  setShowModalAction,
  onSubmit,
}: IModalAction) {
  let registerData = ru.BOARD_FORM || ru.COLUMN_FORM;
  let className = '';

  switch (formType) {
    case EItemType.createBoard:
      registerData = ru.BOARD_FORM;
      className = 'form_board';
      break;
    case EItemType.createColumn:
      registerData = ru.COLUMN_FORM;
      className = 'form_column';
      break;
  }

  ru.BOARD_FORM;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleCallback = (values: Record<string, string>) => {
    onSubmit(values);
    setShowModalAction(false);
  };

  return createPortal(
    <div className="modalAction">
      <div className="modalActionContent">
        <Form
          formData={registerData}
          errorMessage={''}
          className={className}
          onSubmit={handleCallback}
          onCancel={setShowModalAction}
        />
      </div>
    </div>,
    document.getElementById('modal') as Element
  );
}

export default ModalAction;
