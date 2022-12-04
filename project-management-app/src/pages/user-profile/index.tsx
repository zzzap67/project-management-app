import React, { SyntheticEvent, useState } from 'react';
import './styles.css';
import { useNavigate } from 'react-router-dom';
import { useFormWithValidation } from '../../utils';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { useTranslation } from 'react-i18next';
import { ELocalStorage, ETooltipVariant, ICreateUser, ITooltipVariant } from '../../types';
import { deleteUser, updateUser } from '../../store/thunks';
import InfoTooltip from '../../components/InfoTooltip';

function Profile() {
  const [isEditable, setIsEditable] = useState(false);
  const [tooltip, setTooltip] = useState<ITooltipVariant | null>(null);
  const user = useAppSelector((state) => state.userReducer);
  const { values, handleChange, errors, isValid } = useFormWithValidation();
  const navigate = useNavigate();
  const { t } = useTranslation('translation');
  const dispatch = useAppDispatch();

  const handleEdit = () => {
    setIsEditable(true);
  };

  const handleSave = async (e: SyntheticEvent) => {
    e.preventDefault();

    await dispatch(
      updateUser({
        ...values,
        id: user.id,
      } as ICreateUser & Record<'id', string>)
    );
    setIsEditable(false);
  };

  const onDelete = () => {
    setTooltip({
      variant: ETooltipVariant.yesNo,
      text: t(`description.message.youSure`),
      onClick: handleDelete,
      onClose: () => setTooltip(null),
    });
  };

  const handleDelete = async () => {
    localStorage.removeItem(ELocalStorage.token);
    localStorage.removeItem(ELocalStorage.userId);
    await dispatch(deleteUser(user.id));
    navigate('/', { replace: true });
  };

  return (
    <div className="profile">
      <form className="profile-form" onSubmit={() => {}}>
        <h2 className="profile-form__title">{`${t(`description.forms.hello`)}, ${user.name}!`}</h2>
        <div className="profile-form__input-wrapper">
          <label htmlFor="name" className="profile-form__label">
            {t(`description.forms.inputs.nameLabel`)}
          </label>
          <input
            type="text"
            className="profile-form__input"
            id="name"
            name="name"
            placeholder={t(`description.forms.inputs.namePlaceholder`)}
            required
            onChange={handleChange}
            value={!isEditable ? user.name : values.name}
            disabled={!isEditable}
          />
        </div>
        {errors.name && <p className="profile-form__input-error">{errors.name}</p>}
        <div className="profile-form__input-wrapper">
          <label htmlFor="login" className="profile-form__label">
            {t(`description.forms.inputs.loginLabel`)}
          </label>
          <input
            type="text"
            className="profile-form__input"
            id="login"
            name="login"
            placeholder={t(`description.forms.inputs.loginPlaceholder`)}
            required
            onChange={handleChange}
            value={!isEditable ? user.login : values.login}
            disabled={!isEditable}
          />
        </div>
        {errors.login && <p className="profile-form__input-error">{errors.login}</p>}
        <div className="profile-form__input-wrapper">
          <label htmlFor="password" className="profile-form__label">
            {t(`description.forms.inputs.passwordLabel`)}
          </label>
          <input
            type="password"
            className="profile-form__input"
            id="password"
            name="password"
            placeholder={t(`description.forms.inputs.passwordPlaceholder`)}
            required
            onChange={handleChange}
            value={!isEditable ? '*****' : values.password}
            disabled={!isEditable}
          />
        </div>
        {errors.password && <p className="profile-form__input-error">{errors.password}</p>}
        <div className="profile-form__buttons-wrapper">
          {!isEditable && (
            <button
              className="profile-form__button button profile-form__button_type_edit"
              type="button"
              onClick={handleEdit}
            >
              {t(`description.forms.edit`)}
            </button>
          )}
          {isEditable && (
            <button
              className="profile-form__button button profile-form__button_type_save"
              type="submit"
              onClick={handleSave}
              disabled={
                !isValid ||
                !Object.values(errors).every((error) => error === '') ||
                Object.entries(values).length === 0
              }
            >
              {t(`description.forms.save`)}
            </button>
          )}
          {!isEditable && (
            <button
              type="button"
              className="profile-form__button button profile-form__button_type_exit"
              onClick={onDelete}
            >
              {t(`description.forms.delete`)}
            </button>
          )}
        </div>
      </form>
      <InfoTooltip {...tooltip} />
    </div>
  );
}

export default Profile;
