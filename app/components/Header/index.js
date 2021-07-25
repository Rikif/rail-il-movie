import React from "react";
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import './style.scss'

function Header(){

  return (
    <> 
      <a  href="/moviesList" className="link">
        <FormattedMessage {...messages.movies_list} />
      </a>
      <div className="header">
        <FormattedMessage {...messages.header_text} />
      </div>

    </>
  );
}

export default Header;