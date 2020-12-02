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
import axios from './page/axios'
import tableJSON from './page/table_JSON'
import TabelJson from './page/More_Action_JSON'
import Login from './page/login'
import signUp from './page/Sign_Up'
import Counter from "./page/counter_page"

// NOTE ini untuk keep log in
import Axios from 'axios'

// NOTE import action untuk log in
import {login} from "./action"

// NOTE import connect untuk aktifin fuction dari redux
import {connect} from "react-redux"

class App extends React.Component {
  componentDidMount() {
    Axios.get(`http://localhost:2000/users?username=${localStorage.username}`)
    .then((res) => {
      this.props.login(res.data[0])})
      .catch((err) => console.log(err))
  }
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
          <Route path='/table-json' component={tableJSON} />
          <Route path='/more-action-json' component={TabelJson} />
          <Route path='/login' component={Login} />
          <Route path='/sign-up' component={signUp} />
          <Route path='/counter-reducer' component={Counter} />
          <Route path='*' component={NotFound} />
          </Switch>
      </div>
    )
  }
}


export default connect(null, {login}) (App);
