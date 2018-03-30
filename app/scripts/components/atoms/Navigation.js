import React, {Component} from 'react';
import {Menu, Web, Search} from '../svgs/svgs'

class Navigation extends Component {
  render () {
    const { changeCountry } = this.props;

    return (
      <nav className={this.props.className}>
        <ul className="list__content-wrapper">
          <li onClick={changeCountry} data-country="br">Notícias em Destaque</li>
          <li onClick={changeCountry} data-country="br">Notícias do Brasil</li>
          <li onClick={changeCountry} data-country="us">Notícias do EUA</li>
          <li onClick={changeCountry} data-country="ar">Notícias da Argentina</li>
          <li onClick={changeCountry} data-country="fr">Notícias da França</li>
        </ul>
      </nav>
    )
  }
}
export default Navigation;
