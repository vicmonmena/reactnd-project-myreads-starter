import React from 'react';
import notFoundImg from './../img/not-found.jpg'
/**
 * Not found components shows 404 error.
 * 
 * @param {any} props 
 * @returns 
 */
const NotFound = props => {
  return(
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <img style={{textAlign: 'center'}} src={notFoundImg} alt="Not found" />
    </div>
  )
}

export default NotFound;