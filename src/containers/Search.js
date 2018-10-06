import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import SearchForm from './../components/SearchForm';
import List from './../components/List';
import { search } from './../utils/BooksAPI';
import ModalContainer from './ModalContainer';
import Modal from './../components/Modal';

class Search extends Component {

  state = {
    query: '',
    booksFound: [],
    modalVisible: false
  } 
  
  /**
   * Taking reference to input field inside form to catch query search
   * 
   * @param {any} inputElement - ref to input html element
   */
  setInputRef = inputElement => {
    this.input = inputElement
  }

  handleSearchSubmit = event => {
    event.preventDefault();
    const query = this.input.value;

    search(query).then((books)=> {
      if ((books.error)) {
        // TODO: show this message in a modal
        // console.log('An error occurred searching for: ' + query)
        this.handleOpenModal();
      }
      this.setState({
        query: query,
        booksFound: books
      })
      
    });
  }

  handleCloseModal = (event) => {
    this.setState({
      modalVisible: false,
    })
  }

  handleOpenModal = () => {
    this.setState({
      modalVisible: true,
    })
  }

  render() {
    const { query, booksFound } = this.state;
    const { handleChange } = this.props;
    return(
      <div className="search-books">
        <div className="search-books-bar">
          <Link to='/' className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
  
              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <SearchForm 
              placeholder="Search by title or author" 
              handleSubmit={this.handleSearchSubmit} 
              setRef={this.setInputRef}
            />
              {
                this.state.modalVisible &&
                <ModalContainer>
                  <Modal handleClick={this.handleCloseModal}>
                    <h1>{`An error occurred searching for '${this.state.query}'`}</h1>
                  </Modal>
                </ModalContainer>
              }
          </div>
        </div>
        <div className="search-books-results">
          <List title={"Books found for search: " + query} items={booksFound} handleChange={handleChange}/>
        </div>
      </div>
    )
  }
}

Search.propTypes = {
  handleChange: PropTypes.func
}

export default Search;