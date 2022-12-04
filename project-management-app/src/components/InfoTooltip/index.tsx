import { FC, useCallback, useEffect, useState } from 'react';
import okIcon from '../../assets/icons/icon-ok.svg';
import errorIcon from '../../assets/icons/icon-error.svg';
import { ETooltipType, ETooltipVariant, ITooltip, ITooltipVariant } from '../../types';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { createPortal } from 'react-dom';
import { selectAnyError } from '../../store/selectors';
import './styles.css';
import { useTranslation } from 'react-i18next';

const initialTooltip: ITooltip = {
  message: '',
  type: ETooltipType.ok,
};

const InfoTooltip: FC<Partial<ITooltipVariant>> = ({ variant, text, onClick, onClose }) => {
  const [tooltip, setTooltip] = useState<ITooltip>(initialTooltip);
  const [visible, setVisible] = useState<boolean>(false);
  const error = useAppSelector(selectAnyError);
  const dispatch = useAppDispatch();
  const { t } = useTranslation('translation');

  const { message, type } = tooltip;

  const handleClose = useCallback(() => {
    setVisible(false);
    setTooltip(initialTooltip);
    onClose && onClose();
  }, [onClose]);

  useEffect(() => {
    if (variant === ETooltipVariant.yesNo) {
      setTooltip({
        type: ETooltipType.error,
        message: text || '',
      });
      setVisible(true);
    }
  }, [variant, text]);

  useEffect(() => {
    if (visible && variant === ETooltipVariant.plain) {
      setTimeout(() => {
        handleClose();
      }, 2000);
    }
  }, [visible, dispatch, variant, handleClose]);

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
        {variant === ETooltipVariant.yesNo && (
          <button
            className="popup__agree-button"
            onClick={() => {
              if (onClick) {
                onClick();
              }
            }}
          >
            {t('description.forms.okButtonText')}
          </button>
        )}
      </div>
    </div>,
    document.getElementById('tooltip') as HTMLDivElement
  );
};
export default InfoTooltip;
