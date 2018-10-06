import React from 'react';
import PropTypes from 'prop-types';
import ListItem from './ListItem';

/**
 * This is the layout component for Lists.
 * 
 * @param {any} props 
 * @returns 
 */
const List = props => {
  const { title, items } = props;
  return (
    <div className="bookshelf">
      { (title) && title.length > 0 &&
        <h2 className="bookshelf-title">{title}</h2>
      }
      <div className="bookshelf-books">
        <ol className="books-grid">
        {
          (items) && items.length > 0 &&
          items.map(item => (
            <li key={'book-' + item.id}>
              <ListItem data={item}/>
            </li>
          ))
        }
        {
          (!(items) || items.length === 0) &&
          <span className="book-info-not-found">No books found!</span>
        }
        </ol>
      </div>
    </div>
  );
}

ListItem.propTypes = {
  title: PropTypes.string,
  items: PropTypes.array,
}

export default List;