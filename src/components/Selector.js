import React from 'react'
import PropTypes from 'prop-types';

/**
 * This is an Options Selector LAYOUT.
 * 
 * @param {any} props 
 * @returns 
 */
const Selector = props => {
  const { value, handleChange, options } = props;
  return (
    <select value={value} onChange={handleChange}>
    {
      options.map(option => (
        <option key={option.value} value={option.value} disabled={option.disabled}>{option.title}</option>    
      ))
    }
    </select>
  );
}

Selector.propTypes = {
  value: PropTypes.string,
  handleChange: PropTypes.func,
  options: PropTypes.array.isRequired,
}

export default Selector;