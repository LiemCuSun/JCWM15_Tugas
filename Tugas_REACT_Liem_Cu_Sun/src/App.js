// import logo from './logo.svg'; // NOTE untuk access ke LOGO
import './App.css';
import React from 'react'
import Navigation from './component/navbar'
import { Route, Switch } from 'react-router-dom'

import Home_Page from './page/Home_Page'
import Carousel1 from './page/Carousel'
import Link_Page from './page/Link_Page'
import To_Do_List from './page/To_Do_List';
import NotFound from './page/404_page'
import axios from './axios'

class App extends React.Component {
  render() {
    return (
      <div> 
        <Navigation />
          <Switch>
          <Route exact path='/' component={Home_Page} />
          <Route path='/Link_Page' component={Link_Page} />
          <Route path='/carousel' component={Carousel1} />
          <Route path='/to-do-list' component={To_Do_List} />
          <Route path='/axios' component={axios} />
          <Route path='*' component={NotFound} />
          </Switch>
      </div>
    )
  }
}


export default App;
