import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SearchForm from './../components/SearchForm';
import List from './../components/List'
import { search } from './../utils/BooksAPI';

class Search extends Component {

  state = {
    query: '',
    booksFound: []
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
        console.log('An error occurred searching for: ' + query)
        this.setState({
          query: query,
          booksFound: books
        })
      } else {
        console.log(books);
        this.setState({
          query: query,
          booksFound: books
        })
      }
    });
  }

  render() {
    const { query, booksFound } = this.state;
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
          </div>
        </div>
        <div className="search-books-results">
          <List title={"Books found for search: " + query} items={booksFound}/>
        </div>
      </div>
    )
  }
}

export default Search;