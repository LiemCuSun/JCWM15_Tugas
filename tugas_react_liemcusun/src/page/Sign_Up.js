import React from 'react'
import Axios from 'axios'
import {
    Button,
    Table,
    Form
} from 'react-bootstrap'

// import redirect from react router-dom
import {Redirect} from "react-router-dom"

export default class signUp extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            dbUsers: {},
            signUpCon: {}
        }
    }

    componentDidMount() {
        Axios.get('http://localhost:2000/users')
            .then((res) => {
                console.log(res.data)
                this.setState({ dbUsers: res.data })
                this.setState({ signUpCon: res.data })
            })
            .catch((err) => console.log(err))
    }

    tableHead = () => {
        return (
            <thead>
                <tr><h1 style={{ display: "flex", justifyContent: "center" }}>REGISTRATION FORM</h1></tr>
                {/* <tr>
                    <th>#</th>
                    <th>First_Name</th>
                    <th>Last_Name</th>
                    <th>Email</th>
                    <th>Action</th>
                </tr> */}
            </thead>
        )
    }

    // tableBody = () => {
    //     let { dbUsers } = this.state
    //     return (
    //         <tbody>
    //             {dbUsers.map((item, index) => {
    //                 return (
    //                     <tr key={index}>
    //                         <td>{index + 1}</td>
    //                         <td>{item.first_name}</td>
    //                         <td>{item.last_name}</td>
    //                         <td>{item.email}</td>
    //                         <td>
    //                             <Button onClick={() => this.handleEdit(item.id)} value={item.id}>Edit</Button><p> </p>
    //                             <Button onClick={() => this.handleDelete(item.id)} value={item.id}>Delete</Button>
    //                         </td>
    //                     </tr>
    //                 )
    //             })}
    //         </tbody>
    //     )
    // }

    tableInput = () => {
        return (
            <tbody>
                    <tr><h3>Email</h3></tr>
                    <tr><Form.Control type="email" placeholder="Enter email" ref="email" /></tr>
                    <tr><h3>User Name</h3></tr>
                    <tr><Form.Control type="text" placeholder="Enter User Name" ref="username" /></tr>
                    <tr><h3>Password</h3></tr>
                    <tr><Form.Control type="text" placeholder="Enter New Password" ref="password" /></tr>
                    <tr><div style={{ display: "flex", justifyContent: "center", marginTop: "50px", marginBottom:"50px" }}>
                        <Button onClick={this.handleAdd}>SUBMIT</Button></div></tr>
                        
            </tbody>
        )
    }

    table = () => {
        return (
            <Table>
                {this.tableHead()}
                {/* {this.tableBody()} */}
                {this.tableInput()}
            </Table>
        )
    }

    handleAdd = () => {
        let username = this.refs.username.value
        let password = this.refs.password.value
        let email = this.refs.email.value
        console.log(username, password, email)
        if (!username || !password || !email ) return alert('Please leave any form blank !')
        Axios.post('http://localhost:2000/users', {
            username,
            password,
            email
        })
            .then((res) => {
                console.log(res.data)
                Axios.get('http://localhost:2000/users')
                    .then((res) => {
                        console.log(res.data)
                        this.setState({ dbUsers: res.data })
                        alert ("Your account has successfully registered")
                    })
                    .catch((err) => console.log(err))
            })
            .catch((err) => console.log(err))
    }

    // handleDelete = (index) => {
    //     Axios.delete(`http://localhost:2000/users/${index}`)
    //         .then((res) => {
    //             console.log(res.data)
    //             Axios.get('http://localhost:2000/users')
    //                 .then((res) => {
    //                     console.log(res.data)
    //                     this.setState({ dbUsers: res.data })
    //                 })
    //                 .catch((err) => console.log(err))
    //         })
    //         .catch((err) => console.log(err))
    // }

    // handleEdit = (index) => {
    //     this.tableInput(index)
    //     Axios.put(`http://localhost:2000/users/${index}`, {
    //         first_name: 'Rakha',
    //         last_name: 'Adhi',
    //         email: 'rakhaa34@gmail.com'
    //     })
    //         .then((res) => {
    //             console.log(res.data)
    //             Axios.get('http://localhost:2000/users')
    //                 .then((res) => {
    //                     console.log(res.data)
    //                     this.setState({ dbUsers: res.data })
    //                 })
    //                 .catch((err) => console.log(err))
    //         })
    //         .catch((err) => console.log(err))
    // }

    render() {
        if(this.state.dbUsers.length === this.state.signUpCon.length + 1) return <Redirect to="/login" />
        console.log(this.state.dbUsers)
        return (
            <div style={styles.container}>
                <h1 style={{marginBottom:"100px", display:"flex", justifyContent:"center"}}>
                    Please Fill the Sign Up Form
                </h1>
                {this.table()}
            </div>
        )
    }
}

const styles = {
    container: {
        margin: '80px auto',
        width: '800px',
        height: '800px',
        backgroundColor: 'lightblue',
        padding: '10px',
        borderRadius: '15px'
    },
    item: {
        margin: '15px 0'
    }
}