import React from 'react';
import Selector from './Selector';
/**
 * This is an specific type (books) of Option Selector component.
 * 
 * @param {any} props 
 * @returns 
 */
const BookSelector = props => {
  
  // Selector options for books
  const options = [
    {title: 'Move to...', value: 'move', disabled: true},
    {title: 'Currently Reading', value: 'currentlyReading'},
    {title: 'Want to Read', value: 'wantToRead'},
    {title: 'Read', value: 'read'},
    {title: 'None', value: 'none'}
  ];

  return(
    <div className="book-shelf-changer">
      <Selector options={options} />
    </div>
  );
}

export default BookSelector;