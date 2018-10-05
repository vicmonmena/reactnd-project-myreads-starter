import React from 'react'
import PropTypes from 'prop-types';

/**
 * This is an Options Selector LAYOUT.
 * 
 * @param {any} props 
 * @returns 
 */
const Selector = props => {
  const { options } = props;
  return (
    <select>
    {
      options.map(option => (
        <option key={option.value} value={option.value} disabled={option.disabled}>{option.title}</option>    
      ))
    }
    </select>
  );
}

Selector.propTypes = {
  options: PropTypes.array.isRequired,
}

export default Selector;