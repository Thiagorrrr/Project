import React, {Component} from 'react';
import {Menu, Web, Search} from '../svgs/svgs'
import Navigation from '../atoms/Navigation'
import SearchInput, {createFilter} from 'react-search-input'
class NavHeaderList extends Component {
  constructor() {
    super();
    this.state = {
      close: ' '
    }
    this.close = this.close.bind(this);
  }

  close() {
    this.setState({
      close: (this.state.close === ' ') ? 'true' : ' '
    })
  }
  render () {
    const { searchUpdated, changeCountry, click, onClick} = this.props;
    let { close }=this.state

    return (
      <div className="header__menu">
        <div className="header__menu__wrapper">
        <div className={`container__search-input ${click}`}>
              <SearchInput className={`search-input ${click}`}
                placeholder="Pesquisa"
                onChange={searchUpdated} />
              <Search/>
            </div>
          <div className="header__menu__wrapper-svgs">
            <div className="svg" onClick={this.close}><Menu/></div>
            <a href="#"><div className="svgWeb"> <Web/></div></a>
            <div className={`svgSearch ${click}`} onClick={onClick}><Search/></div>
          </div>
        </div>
        <div className={`listMovel ${close}`}>
          <div className="listMovel__close" onClick={this.close}>X</div>
          <div className="listMovel__content">
            <Navigation
              changeCountry={changeCountry}
              className="listMovel__content-nav"
            />
          </div>
        </div>
        <div className="listDesk">
          <Navigation
            changeCountry={changeCountry}
            className="listDesk__content-nav"
          />
       </div>
      </div>
    )
  }
}
export default NavHeaderList;
