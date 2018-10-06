import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import './App.css'
import * as BooksAPI from './utils/BooksAPI';
import List from './components/List';
import Search from './containers/Search';
import NotFound from './components/NotFound.js';

class BooksApp extends Component {
  state = {
    currentlyReadingList: [],
    wantToReadList: [],
    readList: []
  }

  componentDidMount() {
    // Load books list when component is mounted
    BooksAPI.getAll().then((books) => {
      console.log(books);
      const booksByShelf = _.groupBy(books, 'shelf');
      console.log(booksByShelf);
      this.setState({
        currentlyReadingList: booksByShelf["currentlyReading"],
        wantToReadList: booksByShelf["wantToRead"],
        readList: booksByShelf["read"]
      })
    });
  }

  render() {
    const { currentlyReadingList, wantToReadList, readList } = this.state;
    return (
      <div className="app">
        {/*
          Switch component allows me to catch non matches routes and shows NotFound page.
          (from https://tylermcginnis.com/react-router-handling-404-pages/)
        */}
        <Switch>
          <Route exact path='/' render={() => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              {/* 
                *******************************************
                JSX comment: Main layout for all list books
                    className="list-books-content"
                ******************************************* 
              */}
              <div className="list-books-content">
                <div>
                  {/* 
                    *******************************************
                    JSX comment: Currently Reading list books
                    ******************************************* 
                  */}
                  <List title="Currently Reading" items={currentlyReadingList}/>
                  {/* 
                    *******************************************
                    JSX comment: Want to Read list books
                    ******************************************* 
                  */}
                  <List title="Want to Read" items={wantToReadList}/>
                  {/* 
                    *******************************************
                    JSX comment: Read list books
                    ******************************************* 
                  */}
                  <List title="Read" items={readList}/>
                </div>
              </div>
              <div className="open-search">
                <Link to='/search' >Add a book</Link>
              </div>
            </div>
          )} />
          {/* 
            *******************************************
            JSX comment: Route to load Search component
            ******************************************* 
          */}
          <Route path='/search' render={({ history }) => (
            <Search handleSubmit={this.handleSearchSubmit}/>
          )} />
          <Route component={NotFound} />
        </Switch>
      </div>
    )
  }
}

export default BooksApp
