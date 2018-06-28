import React, { Component } from 'react'
import Paper from 'material-ui/Paper'

const style = {
  height: 'auto',
  width: 'auto',
  margin: 5,
  marginTop: 20,
  padding: 10,
  textAlign: 'center',
  display: 'inline-block'
}

export default class PaperText extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="main-text__wrapper">
        <Paper style={style} zDepth={1} rounded={false}>
          <div className="main-text__title">
            {this.props.title}
          </div>
          <div className="main-text__text">
            {this.props.text}
          </div>
        </Paper>
      </div>
    )
  }
}
