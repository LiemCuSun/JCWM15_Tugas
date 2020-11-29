import React from 'react'
import { Button } from 'react-bootstrap'
import './../stylecontent.css'
import { Link } from 'react-router-dom'

class Home_Page extends React.Component {
    render () {
        return (
            <div id='home'>
            <h1 id="h1-0" style={{textAlign:"center", color:"black"}}>This is Home Page</h1>
            <Link style={{color:"white"}} to='/Link_Page'>
            <Button style={{width:"340px"}}>Link Page</Button>
            </Link>
            </div>
        )
    }
}

export default Home_Page