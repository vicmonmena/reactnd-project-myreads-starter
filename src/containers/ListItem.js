import React, { Component } from 'react'
import PropTypes from 'prop-types';
import BookSelector from './../components/BookSelector'
import ModalContainer from './ModalContainer';
import Modal from './../components/Modal';

/**
 * This is the List Item component.
 * 
 * @param {any} props 
 * @returns 
 * 
 * TODO: aplicar a cover -> https://www.npmjs.com/package/react-remote-image para conocer el tamaño de la imagena ntes de cargarla
 */
class ListItem extends Component {

  state = {
    modalVisible: false
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
    const { title, authors, imageLinks, description, publisher, categories } = this.props.data;
    const cover = imageLinks['smallThumbnail'] || imageLinks['thumbnail'] || '#';
    return (
      <div>
        <div className="book" onClick={this.handleOpenModal}>
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${cover})` }}></div>
            <BookSelector book={this.props.data} handleChange={this.props.handleChange} />
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
        {
          this.state.modalVisible &&
          <ModalContainer>
            <Modal handleClick={this.handleCloseModal}>
              <div className="book-modal" >
                <div className=".book-grid-item">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${cover})` }}></div>
                </div>
                <div className=".book-grid-item">
                {/*TITLE*/}
                  <div className="book-modal-title"><h3>{title || 'No title'}</h3></div>
                  <div className="book-modal-title"><h4>Authors:</h4></div>
                  {/*AUTHORS*/}
                  {
                    (!(authors) || authors.length === 0) &&
                    <div className="book-authors">No authors found!</div>
                  }
                  {
                    (authors) && authors.length > 0 &&
                    authors.map((author, index) =>(
                      <div key={'autor-' + index} className="book-authors"><h4>{author}</h4></div>    
                    ))
                  }
                  {/*PUBLISHER*/}
                  <div className="book-authors"><h4>{`Publisher: ${publisher}` || 'Publisher: No publisher'}</h4></div>
                  {/*CATEGORIES*/}
                  <div className="book-modal-title"><h4>Categories:</h4></div>
                  {
                    (!(categories) || categories.length === 0) &&
                    <div className="book-authors">No categories found!</div>
                  }
                  {
                    (categories) && categories.length > 0 &&
                    categories.map((category, index) =>(
                      <div key={'category-' + index} className="book-authors"><h3>{category}</h3></div>    
                    ))
                  }
                  {/*DESCRIPTION*/}
                  <div className="book-modal-description">{description || 'No description'}</div>
                </div>
              </div>
            </Modal>
          </ModalContainer>
        }
      </div>
    );
  }
}

ListItem.propTypes = {
  data: PropTypes.object.isRequired,
  handleChange: PropTypes.func
}

export default ListItem;