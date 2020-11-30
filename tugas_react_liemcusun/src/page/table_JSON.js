import React from 'react'
import Axios from 'axios'
import {
    Button,
    Table,
    Form
} from 'react-bootstrap'

class tableJSON extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            dbUsers: []
        }
    }

    componentDidMount() {
        Axios.get('http://localhost:2000/users')
            .then((res) => {
                console.log(res.data)
                this.setState({ dbUsers: res.data })
            })
            .catch((err) => console.log(err))
    }

    tableHead = () => {
        return (
            <thead>
                <tr>
                    <th>#</th>
                    <th>First_Name</th>
                    <th>Last_Name</th>
                    <th>Email</th>
                    <th>Action</th>
                </tr>
            </thead>
        )
    }

    tableBody = () => {
        let { dbUsers } = this.state
        return (
            <tbody>
                {dbUsers.map((item, index) => {
                    return (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.first_name}</td>
                            <td>{item.last_name}</td>
                            <td>{item.email}</td>
                            <td>
                                <Button onClick={() => this.handleEdit(item.id)} value={item.id}>Edit</Button><p> </p>
                                <Button onClick={() => this.handleDelete(item.id)} value={item.id}>Delete</Button>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        )
    }

    tableInput = () => {
        return (
            <tbody>
                <tr>
                    <td>#</td>
                    <td><Form.Control type="text" placeholder="Enter First Name" ref="firstname" /></td>
                    <td><Form.Control type="text" placeholder="Enter Last Name" ref="lastname" /></td>
                    <td><Form.Control type="email" placeholder="Enter email" ref="email" /></td>
                    <td><Button onClick={this.handleAdd} >SUBMIT</Button></td>
                </tr>
            </tbody>
        )
    }

    table = () => {
        return (
            <Table>
                {this.tableHead()}
                {this.tableBody()}
                {this.tableInput()}
            </Table>
        )
    }

    handleAdd = () => {
        let first_name = this.refs.firstname.value
        let last_name = this.refs.lastname.value
        let email = this.refs.email.value
        console.log(first_name, last_name, email)
        Axios.post('http://localhost:2000/users', {
            first_name,
            last_name,
            email
        })
            .then((res) => {
                console.log(res.data)
                Axios.get('http://localhost:2000/users')
                    .then((res) => {
                        console.log(res.data)
                        this.setState({ dbUsers: res.data })
                    })
                    .catch((err) => console.log(err))
            })
            .catch((err) => console.log(err))
    }

    handleDelete = (index) => {
        Axios.delete(`http://localhost:2000/users/${index}`)
            .then((res) => {
                console.log(res.data)
                Axios.get('http://localhost:2000/users')
                    .then((res) => {
                        console.log(res.data)
                        this.setState({ dbUsers: res.data })
                    })
                    .catch((err) => console.log(err))
            })
            .catch((err) => console.log(err))
    }

    handleEdit = (index) => {
        this.tableInput(index)
        Axios.put(`http://localhost:2000/users/${index}`, {
            first_name: 'Rakha',
            last_name: 'Adhi',
            email: 'rakhaa34@gmail.com'
        })
            .then((res) => {
                console.log(res.data)
                Axios.get('http://localhost:2000/users')
                    .then((res) => {
                        console.log(res.data)
                        this.setState({ dbUsers: res.data })
                    })
                    .catch((err) => console.log(err))
            })
            .catch((err) => console.log(err))
    }

    render() {
        console.log(this.state.dbUsers)
        return (
            <div>
                <h1>
                    Hi JSON Table
                </h1>
                {this.table()}
            </div>
        )
    }
}

export default tableJSON

// NOTE: bikin fungsi edit dan delete
// kalau pas edit semua jadi input (firstname, lastname & email) terus action berubah jadi save and cancel