import { FC, useEffect, useState } from 'react';
import okIcon from '../../assets/icons/icon-ok.svg';
import errorIcon from '../../assets/icons/icon-error.svg';
import { ETooltipType, ITooltip } from '../../types';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { createPortal } from 'react-dom';
import { selectAnyError } from '../../store/selectors';
import './styles.css';

const initialTooltip: ITooltip = {
  message: '',
  type: ETooltipType.ok,
};

const InfoTooltip: FC = () => {
  const [tooltip, setTooltip] = useState<ITooltip>(initialTooltip);
  const [visible, setVisible] = useState<boolean>(false);
  const error = useAppSelector(selectAnyError);
  const dispatch = useAppDispatch();

  const { message, type } = tooltip;

  const handleClose = () => {
    setVisible(false);
    setTooltip(initialTooltip);
  };

  useEffect(() => {
    if (visible) {
      setTimeout(() => {
        handleClose();
      }, 2000);
    }
  }, [visible, dispatch]);

  useEffect(() => {
    if (error) {
      setTooltip({
        message: error,
        type: ETooltipType.error,
      });
      setVisible(true);
    }
  }, [error]);

  return createPortal(
    <div className={`popup ${visible && 'popup_opened'}`}>
      <div className="popup__container">
        <img
          className="popup__icon"
          src={type === ETooltipType.error ? errorIcon : okIcon}
          alt="icon"
        />
        <p className="popup__text">{message}</p>
        <button
          className="popup__close-button"
          onClick={handleClose}
          type="button"
          aria-label="close-button"
        />
      </div>
    </div>,
    document.getElementById('tooltip') as HTMLDivElement
  );
};

export default InfoTooltip;
