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
  itemType: EItemType;
  isReadOnly: boolean;
  isDescriptionNeeded: boolean;
  id: string;
  title: string;
  description: string;
  setShowModalAction: Dispatch<SetStateAction<boolean>>;
  onSubmit: (values: Record<string, string>) => Promise<void>;
}

function ModalAction({
  itemType,
  isReadOnly,
  isDescriptionNeeded,
  id,
  title,
  description,
  setShowModalAction,
  onSubmit,
}: IModalAction) {
  const registerData = ru.BOARD_FORM;
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
          className={'form_board'}
          onSubmit={handleCallback}
          onCancel={setShowModalAction}
        />
      </div>
    </div>,
    document.getElementById('modal') as Element
  );
}

export default ModalAction;
