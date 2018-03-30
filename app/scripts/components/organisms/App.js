import React, { Component } from 'react';
import SearchInput, {createFilter} from 'react-search-input'
import PropTypes from 'prop-types';
import Header from './Header';
import Footer from './Footer';

import NotFound from '../molecules/NotFound'

const api = 'https://newsapi.org/v2/top-headlines?';
const apiKey = 'apiKey=8fc508c3212b4d0e842a4ad2c4a7d376';


const KEYS_TO_FILTERS = ['title', 'description']

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      news: [],
      pageNumbers: [],
      searchTerm: '',
      click: ' ',
      currentPage: 1,
      todosPerPage: 7
    };

    this.number = this.number.bind(this)
    this.numberActive = this.numberActive.bind(this)
    this.searchUpdated = this.searchUpdated.bind(this)
    this.changeCountry = this.changeCountry.bind(this)
    this.click = this.click.bind(this)

  }

  numberActive(index){
    let tmp = this.state.pageNumbers.map(item => {
      item.selected = false
      return item
    })
    tmp[index].selected = true
    this.setState({ pageNumbers: tmp })
    this.setState({
      currentPage: Number(index)
    })
  }

  searchUpdated (term) {
    this.setState({searchTerm: term})
  }

  click() {
    if (this.state.click === "true") {
        this.setState({searchTerm: ' '})
      }

    this.setState({
      click: (this.state.click === ' ') ? 'true' : ' '
    })
  }

  getContent(country) {
    const nation = country || 'br'
    const url = `${api}country=${nation}&${apiKey}`

    fetch(url)
      .then(response => response.json())
      .then((data) => {
         this.setState({ news: data.articles })
      }).catch((error) => {
          console.error(error,"Carregamento da Api falhou!")
      });
    }

  changeCountry(e) {
    this.getContent(e.target.getAttribute('data-country'))
  }

  number(nextProps, nextState) {
    for (let i = 1; i <= Math.ceil(nextState.news.length / this.state.todosPerPage); i++) {
      let indexNumber = this.state.pageNumbers
        indexNumber[i] = [i]
        this.setState({pageNumbers: indexNumber});
      }
   }

  shouldComponentUpdate (nextProps, nextState) {
    if (nextState.news.length !== 0) {
      this.number(nextProps, nextState)
    }
    return true
  }

  componentDidMount() {
    this.getContent()
    let pageNumbers = this.state.pageNumbers.map( item => {
      return { item: item, selected: false }
    })
    this.setState({ pageNumbers })
  }

  render () {
    const { currentPage, todosPerPage, news, searchTerm, click,pageNumbers } = this.state;
    const indexOfLastTodo = currentPage * todosPerPage,
      indexOfFirstTodo = indexOfLastTodo - todosPerPage,
      currentTodos = news.slice(indexOfFirstTodo, indexOfLastTodo),
      filteredNews = currentTodos.filter(createFilter(searchTerm, KEYS_TO_FILTERS))

    const filteredNew = filteredNews.map((index, key)=> {
      return(
        <article className={`cards__information item__${key}`} key={key}>
          <a className="cards__information-click" href={index.url}></a>
            <div className="content__image">
              {
                index.urlToImage &&
                  <img alt="image" src={index.urlToImage}></img>
              }
            </div>
          <div className="cards__information-wrapper-text">
            <span className="cards__information-wrapper-date">
              {index.publishedAt.slice(0, 10).split('-').join('/')}
            </span>
            <h2 className="cards__information-title">{index.title} </h2>
            <h3 className="cards__information-description">{index.description} </h3>
            {
              index.author ?
                <span className="cards__information-outhor">Por: {index.author}</span>
                :
                <span className="cards__information-outhor">Por: No Author</span>
            }
          </div>
        </article>
      )
    })


    const renderPageNumbers = this.state.pageNumbers.map((number,key) => {
      return (
        <li
          className={`container__numbers-items ${number.selected && "true"}`}
          key={key}
          id={number}
          onClick={this.numberActive.bind(this, key)}
        >
          {number*todosPerPage}
        </li>
      );
    });

    return (
      <div>
        <Header
          changeCountry={this.changeCountry}
          click={click}
          onClick={this.click}
          searchUpdated={this.searchUpdated}
          close={close}
        />
        <main className="main">
          <div className="container">
            <div className="container__wrapper">
              { filteredNew.length ?
                filteredNew :
                <NotFound/>
              }
            </div>
            {
              filteredNew.length ?

              <div className="container__numbers">
                <ul>
                  {renderPageNumbers}
                </ul>
              </div>: null
            }
          </div>
        </main>
        <Footer />
      </div>
    )
  }
}


export default App;
