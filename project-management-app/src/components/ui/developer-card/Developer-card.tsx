import React from 'react';
import './Developer-card.css';
import data from './developers.json';
import { ReactComponent as GitIcon } from '../../../assets/image/github.svg';
import icon from '../../../assets/image/git-icon.svg';

export const DeveloperCard: React.FunctionComponent = () => {
  return (
    <div className="developer_card">
      {data.map((item, index: number) => (
        <div className="developer" key={index}>
          <p className="developer_name">{item.name}</p>
          <div className="git_info">
            <GitIcon className="git_icon" />
            <p className="developer_github">{item.github}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
export default DeveloperCard;
