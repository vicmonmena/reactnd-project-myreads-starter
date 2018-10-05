import React from 'react'
import PropTypes from 'prop-types';
import BookSelector from './BookSelector'
/**
 * This is the List Item component.
 * 
 * @param {any} props 
 * @returns 
 * 
 * TODO: aplicar a cover -> https://www.npmjs.com/package/react-remote-image para conocer el tamaño de la imagena ntes de cargarla
 */
const ListItem = props => {
  const { title, authors, imageLinks} = props.data;
  const cover = imageLinks['smallThumbnail'] || imageLinks['thumbnail'] || '#';
  return (
    <div className="book">
      <div className="book-top">
        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${cover})` }}></div>
        <BookSelector />
      </div>
      <div className="book-title">{title || 'No title'}</div>
      {
        (!(authors) || authors.length === 0) &&
        <div className="book-authors">No authors found!</div>
      }
      {
        (authors) && authors.length > 0 &&
        authors.map((author, index) =>(
          <div key={'autor-' + index} className="book-authors">{author}</div>    
        ))
      }
    </div>
  );
}

ListItem.propTypes = {
  data: PropTypes.object.isRequired,
}

export default ListItem;