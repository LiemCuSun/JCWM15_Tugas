import React from "react";

import {connect} from 'react-redux'

import { Button } from "react-bootstrap";

import {
  plus,
  minus
} from "../action"

class Count extends React.Component {
  handlePlus = () =>{
    this.props.plus()
  }

  handleMinus = () =>{
    this.props.minus()
  }

  render() {
    return (
      <div style={styles.container}>
        <h1 style={{fontSize: "100px"}}>{this.props.count}</h1>
        <Button style={{marginRight:"30px"}} onClick={this.handleMinus}>
          ➖
        </Button>
        <Button onClick={this.handlePlus}>
          ➕
        </Button>
      </div>
    );
  }
}

const styles = {
  container: {
    margin: "100px auto",
    width: "300px",
    textAlign: "center",
    fontSize: "40px",
    backgroundColor : "aqua"
  },
};

const mapStateToProps = (state) => {
  return {
    count : state.count.count
  }
}

export default connect(mapStateToProps, {minus, plus})(Count);
