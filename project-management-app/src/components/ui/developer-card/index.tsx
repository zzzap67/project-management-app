import React from 'react';
import './style.css';
import data from './developers.json';
import { ReactComponent as GitIcon } from '../../../assets/image/github.svg';

export const DeveloperCard: React.FunctionComponent = () => {
  return (
    <div className="developer_card">
      {data.map((item, index: number) => (
        <div className="developer" key={index}>
          <p className="developer_name">{item.name}</p>
          <div className="git_info">
            <GitIcon className="git_icon" />
            <a href={item.href} className="developer_github">
              {item.github}
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};
export default DeveloperCard;
