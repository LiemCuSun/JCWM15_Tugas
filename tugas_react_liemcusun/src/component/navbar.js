import React from 'react'
import {
    Navbar,
    Nav,
    NavDropdown,
    // Form,
    // FormControl,
    // Button,
    NavLink,
    Dropdown
} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import logo from './../logo192.png'

// import connect
import { connect } from "react-redux"

//NOTE import action log out
import { logout } from "../action"

class Navigation extends React.Component {
    handleLogout = () => {
        this.props.logout()
        localStorage.removeItem('username')
    }
    render() {
        return (
            <Navbar bg="primary" variant="dark" expand="lg">
                <Navbar bg="primary" variant="dark">
                    <Link to='/'>
                        <Navbar.Brand href="http://localhost:3000/">
                            <img
                                alt=""
                                src={logo}
                                width="30"
                                height="30"
                                className="d-inline-block align-top"
                            />{' '} React Exercise - Liem Cu Sun
                        </Navbar.Brand>
                    </Link>
                </Navbar>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <NavLink>
                            <Link style={{ color: "white" }} to='/'>Home Page</Link>
                        </NavLink>
                        <NavLink>
                            <Link style={{ color: "white" }} to='/carousel'>Carousel</Link>
                        </NavLink>
                        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                            <NavDropdown.Item><Link to='/to-do-list'>To Do List Exercise</Link></NavDropdown.Item>
                            <NavDropdown.Item><Link to='/axios'>Axios</Link></NavDropdown.Item>
                            <NavDropdown.Item><Link to='/table-json'>Table JSON</Link></NavDropdown.Item>
                            <NavDropdown.Item><Link to='/more-action-json'>More Action JSON</Link></NavDropdown.Item>
                            <NavDropdown.Item><Link to='/counter-reducer'>Counter Reducer</Link></NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    {/* <Form inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                        <Button variant="outline-success">Search</Button>
                    </Form> */}
                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            <img src="https://cdn.onlinewebfonts.com/svg/img_568656.png" alt="user" width="20px" height="20px" />
                            {this.props.username ? this.props.username : " Username"}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            {this.props.username ?
                                <Dropdown.Item onClick={this.handleLogout}>Log Out</Dropdown.Item>
                                :
                                <>
                                    <Dropdown.Item><Link to='/login'>Login</Link></Dropdown.Item>
                                    <Dropdown.Item><Link to='/sign-up'>Sign Up</Link></Dropdown.Item>
                                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                </>
                            }
                        </Dropdown.Menu>
                    </Dropdown>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        username: state.user.username,
        password: state.user.password,
        email: state.user.email
    }
}

export default connect(mapStateToProps, { logout })(Navigation)