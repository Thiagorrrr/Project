import React, { Component } from 'react';
import NavHeaderList from '../molecules/NavHeaderList.js';

class Header extends Component {
   constructor() {
     super();
     this.state = {
        className: 'hidden'
     }
   }


   handleScroll() {
     this.setState({
      className: (document.documentElement.scrollTop > 0) ? 'show' : 'hidden '
     })
   }

   componentDidMount() {
     window.onscroll = () => this.handleScroll()
   }


  render() {
    const { changeCountry, click, searchUpdated, onClick} = this.props;
    return (
      <header>
        <div className={`header_static ${this.state.className}`}>
          <div className={`header ${this.state.className}`}>
            <NavHeaderList
              searchUpdated={searchUpdated}
              click={click}
              onClick={onClick}
              changeCountry={changeCountry}
            />
            <div>
              <h1>webMedia</h1>
            </div>
          </div>
        </div>
      </header>
    )
  }
}
export default Header;
