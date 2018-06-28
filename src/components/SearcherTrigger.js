import React, { Component } from 'react'

export default class SearcherTrigger extends Component {
  goForm = () => {
    this.context.router.push('/form')
  }

  render() {
    return (
      <div className="searcherTrigger__wrapper">
        <div className="searcherTrigger__input" onClick={() => { this.goForm() }}>¿Qué servicio necesitas?</div>
        <div className="searcherTrigger__input">¿Dónde lo necesitas?</div>
        <div className="general-button">Busca Profesionales</div>
      </div>
    )
  }
}

SearcherTrigger.contextTypes = {
  router: React.PropTypes.object
}
