import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { get } from './../utils/BooksAPI';
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

  handleChange = (event, from) => {
    event.preventDefault();
    const data = {
      fromShelf: from,
      toShelf: event.target.value,
      book: this.props.book
    }
    // 2. Update selector based on value selected
    this.setState({
      value: data.toShelf
    })
    // Invoke parent component to move the book to the corresponding list.
    this.props.handleChange(data);
  }

  componentDidMount() {
    get(this.props.book.id).then((book)=> {
      // console.log(book);
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
  handleChange: PropTypes.func
}

export default BookSelector;