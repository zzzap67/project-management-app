import React from 'react';
import { ButtonProps } from './Button-interface';
import './style.css';

export const Button: React.FunctionComponent<ButtonProps> = (props) => {
  return (
    <button onClick={props.eventHandler} className={props.className}>
      {props.buttonName}
    </button>
  );
};
export default Button;
