import React from 'react';
import { ButtonProps } from './Button-interface';
import './Button.css';

export const Button: React.FunctionComponent<ButtonProps> = (props) => {
  return <button className={`button ${props.className}`}>{props.buttonName}</button>;
};
export default Button;
