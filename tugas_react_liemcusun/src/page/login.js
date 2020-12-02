import Axios from 'axios'
import React from 'react'
import { Button, Form } from 'react-bootstrap'

// import action untuk login dan logout
import {
    login,
    logout
} from '../action'

// import connect redux
import {connect} from "react-redux"

// import redirect from react router-dom
import {Redirect} from "react-router-dom"

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            users: {}
        }
    }

    handleLogin = () => {
        let username = this.refs.username.value
        let password = this.refs.password.value
        console.log(username, password)

        if (!username || !password) return alert('Please input username & password')

        Axios.get(`http://localhost:2000/users?username=${username}&password=${password}`)
            .then((res) => {
                console.log(res.data)
                if (res.data.length === 0) return alert('Invalid Username or Password')

                this.props.login(res.data[0])
                // localStorage.setItem("username", username) ini syntax lebih panjang
                localStorage.username = username

            })
            .catch((err) => { console.log(err) })
    }
    render() {
        if (this.props.username) return <Redirect to='/' />
        console.log(this.state.users)
        return (
            <div style={styles.container}>
                <h1 style={{ display: "flex", justifyContent: "center" }}>Login</h1>
                <p>Username</p>
                <Form.Control ref="username" type="text" placeholder="Enter Username" />
                <p>Password</p>
                <Form.Control ref="password" type="password" placeholder="Enter Password" />
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <Button onClick={this.handleLogin} variant='primary'>Login</Button>
                </div>
            </div>
        )
    }
}

const styles = {
    container: {
        margin: '80px auto',
        width: '300px',
        height: '300px',
        backgroundColor: 'lightblue',
        padding: '10px',
        borderRadius: '15px'
    },
    item: {
        margin: '15px 0'
    }
}

let mapStateToProps = (state) => {
    return({
        username: state.user.username
    })
}


export default connect(mapStateToProps, {login, logout})(Login)