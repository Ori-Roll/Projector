import React from 'react';
import PropTypes from 'prop-types';
import CellsStyle from '../CellsStyle.module.css';
import style from './NumberCell.module.css';

function NumberCell({ id, content, doCellContentChange }) {
  return (
    <div className={`${style['number-cell']} ${CellsStyle['cell']}`}>
      {content}
    </div>
  );
}

NumberCell.propTypes = {};

export default NumberCell;
