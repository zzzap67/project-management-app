import React, { ChangeEvent, useContext, useState } from 'react';
import './styles.css';
import { useNavigate } from 'react-router-dom';
import { useFormWithValidation } from '../../utils';
import { useAppSelector } from '../../store/hooks';
import { useTranslation } from 'react-i18next';

function Profile() {
  const [isEditable, setIsEditable] = useState(false);
  const [message, setMessage] = useState('');
  const user = useAppSelector((state) => state.userReducer);
  // const { user, setUser } = useContext(CurrentUserContext);
  // const { setTooltip } = useContext(InfoTooltipContext);
  const navigate = useNavigate();
  const { values, handleChange, errors, isValid } = useFormWithValidation();
  const { t } = useTranslation('translation');

  const handleEdit = () => {
    setIsEditable(true);
  };

  const handleExit = () => {
    localStorage.clear();
    // setUser(null);
    navigate('/', { replace: true });
  };

  const isValuesSame = () => {
    const newValues = Object.entries(values);
    return newValues.length === 0 || newValues.every((arr) => 'user[arr[0]] === arr[1]');
  };

  // const handleSubmit = async (evt: ChangeEvent) => {
  //   try {
  //     evt.preventDefault();
  //     const token = localStorage.getItem(constants.STORAGE.JWT);
  //     const newUser = {
  //       name: values.name || user.name,
  //       email: values.email || user.email,
  //     };
  //     const userData = await mainApi.patchCurrentUser(token, newUser);
  //     setUser(userData);
  //     setMessage('');
  //     setIsEditable(false);
  //     setTooltip({
  //       message: constants.MESSAGE.EDIT_PROFILE,
  //       type: constants.MESSAGE_TYPE.OK,
  //     });
  //   } catch (e) {
  //     switch (e.message) {
  //       case '409': {
  //         setMessage(constants.MESSAGE.CONFLICT_USER);
  //         break;
  //       }
  //       case '400': {
  //         setMessage(constants.MESSAGE.REGISTER_ERR);
  //         break;
  //       }
  //       default: {
  //         setMessage(constants.MESSAGE.SERVER_ERR);
  //       }
  //     }
  //   }
  // };

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
            value={!isEditable ? user.name : undefined}
            disabled={!isEditable}
          />
        </div>
        {/*{errors.name && <p className="profile-form__input-error">{errors.name}</p>}*/}
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
            value={!isEditable ? user.login : undefined}
            disabled={!isEditable}
          />
        </div>
        {/*{errors.login && <p className="profile-form__input-error">{errors.login}</p>}*/}
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
            value=""
            disabled={!isEditable}
          />
        </div>
        {/*{errors.login && <p className="profile-form__input-error">{errors.login}</p>}*/}
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
          {message && <p className="profile-form__error">{message}</p>}
          {isEditable && (
            <button
              className="profile-form__button button profile-form__button_type_save"
              type="submit"
              disabled={isValuesSame() || !isValid}
            >
              {t(`description.forms.save`)}
            </button>
          )}
          {!isEditable && (
            <button
              type="submit"
              className="profile-form__button button profile-form__button_type_exit"
              onClick={handleExit}
            >
              {t(`description.forms.delete`)}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default Profile;
