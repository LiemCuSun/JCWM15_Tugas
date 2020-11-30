import React from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'


class Link_Page extends React.Component {
    render () {
        return (
            <div id='home'>
            <h1 id="h1-0" style={{textAlign:"center", color:"black"}}>This is Link Page</h1>
            <Link style={{color:"white"}} to='/'>
            <Button style={{width:"340px"}}>
                Home Page
            </Button>
            </Link>
            </div>
        )
    }
}

export default Link_Page