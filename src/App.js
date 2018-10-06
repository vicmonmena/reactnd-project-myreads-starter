import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import './App.css'
import { getAll, update } from './utils/BooksAPI';
import List from './components/List';
import Search from './containers/Search';
import NotFound from './components/NotFound.js';
import ModalContainer from './containers/ModalContainer'; 
import Modal from './components/Modal';

class BooksApp extends Component {
  state = {
    currentlyReading: [],
    wantToRead: [],
    read: [],
    modalVisible: false
  }

  componentDidMount() {
    // Load books list when component is mounted
    getAll().then((books) => {
      // console.log(books);
      const booksByShelf = _.groupBy(books, 'shelf');
      // console.log(booksByShelf);
      this.setState({
        currentlyReading: booksByShelf["currentlyReading"],
        wantToRead: booksByShelf["wantToRead"],
        read: booksByShelf["read"],
      })
    });
  }

  handleMoveItem = (data) => {

    const { book, fromShelf, toShelf } = data;
    update(book, toShelf).then((res) => {

      if (toShelf !== 'none' && fromShelf !== 'none') {
        // (* -> *) POP and PUSH book from/to corresponding list
        this.setState({
          [fromShelf]: this.state[fromShelf].filter(item => item.id !== book.id),
          [toShelf]: this.state[toShelf].concat([book])
        })
        this.handleOpenModal(`Now this book is in ${toShelf} list!`);
      } else if (fromShelf === 'none' && toShelf !== 'none') {  
        // (none -> *) Just PUSH book to corresponding list
        this.setState({
          [toShelf]: this.state[toShelf].concat([book])
        })
        this.handleOpenModal(`Now this book is in ${toShelf} list!`);
      } else {  
        // (* -> none) Just POP book from corresponding list
        this.setState({
          [fromShelf]: this.state[fromShelf].filter(item => item.id !== book.id),
        })
        this.handleOpenModal('Now this book is not in any list!');
      }
      // ¿none -> none?
    })
  }

  handleCloseModal = (event) => {
    this.setState({
      modalVisible: false,
    })
  }

  handleOpenModal = (text) => {
    this.setState({
      modalVisible: true,
      modalText: text
    })
  }

  render() {
    const { currentlyReading, wantToRead, read } = this.state;
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
                  <List title="Currently Reading" items={currentlyReading} handleChange={this.handleMoveItem}/>
                  {/* 
                    *******************************************
                    JSX comment: Want to Read list books
                    ******************************************* 
                  */}
                  <List title="Want to Read" items={wantToRead} handleChange={this.handleMoveItem}/>
                  {/* 
                    *******************************************
                    JSX comment: Read list books
                    ******************************************* 
                  */}
                  <List title="Read" items={read} handleChange={this.handleMoveItem}/>
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
            <div>
              <Search 
                handleSubmit={this.handleSearchSubmit} 
                handleChange={this.handleMoveItem}
              />
              {
                this.state.modalVisible &&
                <ModalContainer>
                  <Modal handleClick={this.handleCloseModal}>
                    <h3>{this.state.modalText}</h3>
                  </Modal>
                </ModalContainer>
              }
            </div>
          )} />
          <Route component={NotFound} />
        </Switch>
      </div>
    )
  }
}

export default BooksApp
