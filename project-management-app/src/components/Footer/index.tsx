import React from 'react';
import data from '../ui/developer-card/developers.json';
import './style.css';
import rsLogo from '../../assets/icons/rs-logo.svg';

const Footer: React.FunctionComponent = () => {
  return (
    <footer className="footer">
      <div className="developer_links">
        {data.map((item, index: number) => (
          <a href={item.href} key={index} className="github_link">
            {item.github}
          </a>
        ))}
      </div>
      <a className="rss_link" href="https://rs.school/react/">
        <img src={rsLogo} alt="RS School logo" width={61} /> © 2022 The Rolling Scopes
      </a>
    </footer>
  );
};

export default Footer;
