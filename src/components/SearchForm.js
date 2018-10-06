import React from 'react';
import PropTypes from 'prop-types';

/**
 * Form components for search
 * 
 * @param {any} props 
 * @returns 
 */
const SearchForm = props => {
  const { placeholder, handleSubmit, setRef } = props;
  return(
    <div>
      <form onSubmit={handleSubmit} className="Search">
        <input 
          type="text" 
          placeholder={placeholder}
          ref={setRef}
        />
      </form>
      {
        props.children
      }
    </div>
  );
}

SearchForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  setRef: PropTypes.func.isRequired,
}

export default SearchForm;