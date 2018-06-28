import React, { Component } from 'react'
import AppBar from 'material-ui/AppBar'

const styles = {
  bar: {
    backgroundColor: '#e67e29'
  },
  title: {
    cursor: 'pointer'
  }
}

export default class NavBar extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <AppBar
        style={styles.bar}
        className="app__bar"
        title={<span style={styles.title}>{this.props.title}</span>}
        iconElementLeft={this.props.iconleft}
        iconElementRight={this.props.iconright}
      />
    )
  }
}