import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import CellsStyle from '../CellsStyle.module.css';
import style from './DescriptionCell.module.css';

function DescriptionCell({ id, content, doCellContentChange }) {
  const [cellText, setCellText] = useState(content);

  function onInputChange(text) {
    setCellText(text);
    doCellContentChange(id, text, true);
  }

  function onBlur() {
    doCellContentChange(id, cellText, false);
  }
  return (
    <input
      className={`${style['description-cell']} ${CellsStyle['cell']}`}
      value={cellText}
      onChange={(e) => onInputChange(e.target.value)}
      onBlur={() => onBlur()}
    />
  );
}

DescriptionCell.propTypes = {};

export default DescriptionCell;
