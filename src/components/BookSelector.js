import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { get, update } from './../utils/BooksAPI';
import Selector from './Selector';
/**
 * This is an specific type (books) of Option Selector component.
 * 
 * @param {any} props 
 * @returns 
 */
class BookSelector extends Component {
  
  state = {
    value: 'none' // defaut value
  }

  handleChange = event => {
    // 1. Catch onChange event
    // 2. Update selector based on value selected
    // 3. Invoke update from BookAPI to move the book to the corresponding list.
    event.preventDefault();
    console.log(event.target.value)
    this.setState({
      value: event.target.value
    })
    update(this.props.book, event.target.value).then((book) => {
      // TODO: show this message in a modal
      console.log(`Book ${book.id} moved to ${book.shelf} list`)
    })
  }

  componentDidMount() {
    get(this.props.book.id).then((book)=> {
      console.log(book);
      this.setState({
        value: book.shelf
      })
    })
  }

  render() {

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
        <Selector value={this.state.value} options={options} handleChange={this.handleChange}/>
      </div>
    );
  }
}

BookSelector.propTypes = {
  book: PropTypes.object,
}

export default BookSelector;