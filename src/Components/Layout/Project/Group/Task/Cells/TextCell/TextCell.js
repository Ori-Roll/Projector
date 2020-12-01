import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import style from './TextCell.module.css';
import CellsStyle from '../CellsStyle.module.css';

function TextCell({ cell, doCellChange, isTitle = false }) {
  const [cellText, setCellText] = useState(cell.content);

  function onInputChange(text) {
    doCellChange({ ...cell, content: text }, true);
  }

  function onBlur(text) {
    doCellChange({ ...cell, content: text }, false);
  }

  return (
    <input
      className={`${CellsStyle.cell} ${style['text-cell']}`}
      style={{
        ...(isTitle && {
          backgroundColor: 'var(--task-title-default-background-color)',
        }),
      }}
      value={cell.content}
      onChange={(e) => onInputChange(e.target.value)}
      onBlur={(e) => onBlur(e.target.value)}
    />
  );
}

// TextCell.propTypes = {};

/* export default TextCell; */

export default React.memo(TextCell, (prevProps, nextProps) => {
  // if (prevProps.cell.content === "" && nextProps.cell.content === "") return true;
  // return prevProps.cell.content === nextProps.cell.content;
  return _.isEqual(prevProps, nextProps);
});
