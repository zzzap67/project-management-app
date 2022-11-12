import CreateBoardForm from 'components/Board-create-form';
import BoardItem from 'components/BoardItem';
import { ru } from 'components/locales/ru';
import React from 'react';

const Main = () => {
  return (
    <>
      <div> WELCOME TO PROJECT MANAGEMENT APP </div>
      <CreateBoardForm
        formData={ru.REGISTER_FORM}
        errorMessage={''}
        className={'board'}
        onSubmit={function (values: Record<string, string>): void {
          throw new Error('Function not implemented.');
        }}
      />
    </>
  );
};

export default Main;
