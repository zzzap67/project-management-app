import { Dispatch, SetStateAction } from 'react';
import { createPortal } from 'react-dom';

import './styles.css';
import { EItemType } from 'types';
import Form from 'components/Form';
import { ru } from 'components/locales/ru';

interface IModalAction {
  itemType: EItemType;
  isReadOnly: boolean;
  isDescriptionNeeded: boolean;
  id: string;
  title: string;
  description: string;
  userId: string;
  setShowModalAction: Dispatch<SetStateAction<boolean>>;
  onSubmit: (values: Record<string, string>) => Promise<void>;
}

function ModalAction({ itemType, setShowModalAction, onSubmit }: IModalAction) {
  const registerData = ru.BOARD_FORM;
  const registerDataColumn = ru.COLUMN_FORM;

  const handleCallback = (values: Record<string, string>) => {
    onSubmit(values);
    setShowModalAction(false);
  };

  return createPortal(
    <div className="modalAction">
      <div className="modalActionContent">
        {itemType === 'column' ? (
          <Form
            formData={registerDataColumn}
            errorMessage={''}
            className={'form_column'}
            onSubmit={handleCallback}
            onCancel={setShowModalAction}
          />
        ) : (
          <Form
            formData={registerData}
            errorMessage={''}
            className={'form_board'}
            onSubmit={handleCallback}
            onCancel={setShowModalAction}
          />
        )}
      </div>
    </div>,
    document.getElementById('modal') as Element
  );
}

export default ModalAction;
