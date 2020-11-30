import Axios from "axios";
import React, { Component } from "react";
import { Form, Button, Table, Container, Row, Col } from "react-bootstrap";
import '../More_Action.css'

export default class TabelJson extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dbUsers: [],
      id: "",
      first_name: "",
      last_name: "",
      email: "",
      button: "success",
      btn_label: "SUBMIT",
    };
  }

  //#region LifeCycle

  componentDidMount() {
    Axios.get("http://localhost:2000/users")
      .then((res) => {
        this.setState({ dbUsers: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //#endregion

  //#region Component

  tableHead = () => {
    return (
      <thead >
        <tr id="theadJsonTable">
          <th>#</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Actions</th>
        </tr>
      </thead>
    );
  };

  tableBody = () => {
    let { dbUsers } = this.state;
    return (
      <tbody>
        {dbUsers.map((item, index) => {
          return (
            <tr key={index} id="tBodyJsonTable">
              <td>{index + 1}</td>
              <td>{item.first_name}</td>
              <td>{item.last_name}</td>
              <td>{item.email}</td>
              <td>
                <Button className="mx-2" variant="primary" onClick={() => this.handleEditData(index)}>Edit</Button>
                <Button className="mx-2" variant="danger" onClick={() => this.handleDelete(item.id)} value={item.id}>Delete</Button>
              </td>
            </tr>
          );
        })}
      </tbody>
    );
  };

  tableInput = () => {
    return (
      <tbody>
        <tr>
          <td>#</td>
          <td>
            <Form.Control
              type="text"
              placeholder="Masukkan Nama Depan"
              value={this.state.first_name}
              name="first_name"
              onChange={(event) => this.handleChange(event)}
            />
          </td>
          <td>
            <Form.Control
              type="text"
              placeholder="Masukkan Nama Belakang"
              value={this.state.last_name}
              name="last_name"
              onChange={(event) => this.handleChange(event)}
            />
          </td>
          <td>
            <Form.Control
              type="text"
              placeholder="Masukkan Email"
              value={this.state.email}
              name="email"
              onChange={(event) => this.handleChange(event)}
            />
          </td>
          <td>
            <Button variant={this.state.button} onClick={this.handleAddData}>
              {this.state.btn_label}
            </Button>
          </td>
        </tr>
      </tbody>
    );
  };

  tableCetak = () => {
    return (
      <Table id="tableOuter">
        {this.tableHead()}
        {this.tableBody()}
        {this.tableInput()}
      </Table>
    );
  };

  //#endregion

  //#region Handle Data

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleAddData = () => {
    if (this.state.id === "") {
      Axios.post("http://localhost:2000/users", {
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        email: this.state.email,
      })
        .then((res) => {
          this.fetchData();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      Axios.patch(`http://localhost:2000/users/${this.state.id}`, {
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        email: this.state.email,
      })
        .then((res) => {
          this.fetchData();
        })
        .catch((err) => {
          console.log(err);
        });
      alert("Update Berhasil Dilakukan");
    }

    this.setState({
      ...this.props,
      first_name: "",
      last_name: "",
      email: "",

      btn_label: "SUBMIT",
      button: "success",
    });
  };

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

  fetchData = () => {
    return Axios.get("http://localhost:2000/users")
      .then((res) => {
        this.setState({ dbUsers: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleEditData = (index) => {
    this.setState({
      ...this.props,
      btn_label: "UPDATE",
      button: "warning",
    });

    const dataUpdate = this.state.dbUsers
      .filter((user) => user.id === index + 1)
      .map((dataUser) => {
        return dataUser;
      });

    this.setState({
      ...this.props,
      id: dataUpdate[0].id,
      first_name: dataUpdate[0].first_name,
      last_name: dataUpdate[0].last_name,
      email: dataUpdate[0].email,
    });
  };

  //#endregion


  render() {
    // console.log(this.state.dbUsers);
    return (
      <div>
        <Container fluid>
          <Row>
            <Col md={12} id="headerTitle">
              <h1>Table JSON</h1>
            </Col>
          </Row>
          <Row>
            <Col md={12} id="layoutTable">
              {this.tableCetak()}
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
