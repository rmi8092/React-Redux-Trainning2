import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions/index.js'
import Paper from 'material-ui/Paper'
import Toggle from 'material-ui/Toggle'
import Checkbox from 'material-ui/Checkbox'

import { getProfessionCode, getCityCode, getAreaCode, getSelectProfession, getSelectCity, getSelectArea, getResults } from '../reducers/reducer'

var FontAwesome = require('react-fontawesome')

const style = {
  width: 'calc(100% - 20px)',
  margin: 10,
  padding: 15,
  display: 'inline-block',
  position: 'relative',
  switch: {
    maxWidth: 50,
    position: 'absolute',
    right: 50,
    top: 65
  },
  toggle: {
    marginBottom: 16,
    color: '#e67e29'
  },
  labelStyle: {
    fontSize: 14,
    color: '#e67e29',
    fontWeight: 600
  }
}

class Results extends Component {
  state = {
    checkOpinion: false,
    checkedCertified: false
  }

  updateCheckOpinion() {
    this.setState((oldState) => {
      return {
        checkOpinion: !oldState.checkOpinion
      }
    })
  }

  updateCheckCertified() {
    this.setState((oldState) => {
      return {
        checkedCertified: !oldState.checkedCertified
      }
    })
  }

  componentDidMount() {
    this.fetchResults()
  }

  fetchResults = () => {
    const certified = (this.state.checkedCertified) ? true : null
    const hasOpinions = (this.state.checkOpinion) ? true : null
    if (!this.props.results) {
      this.props.fetchResults(this.props.professionCode, this.props.cityCode, this.props.areaCode, certified, hasOpinions)
    }
  }

  goForm = () => {
    this.context.router.push('/form')
  }

  renderRating = (rating) => {
    const numberRate = parseInt(rating)
    let starIcons = []
    for (let i = 0; i < numberRate; i++) {
      starIcons.push(
        <FontAwesome name='star' />
      )
    }
    return starIcons
  }

  renderCertified = (certified) => {
    const certificate = []
    if (certified) {
      certificate.push(
        <div>
          <FontAwesome name='certificate' /><span className="certificate__text">Empresa certificada</span>
        </div>
      )
    }
    return certificate
  }

  renderCard = () => {
    if (this.props.professionals) {
      const cards = []
      this.props.professionals.map((card, index) => {
        cards.push(
          <div key={index} className='card__wrapper'>
            <Paper style={style} zDepth={1} rounded={false}>
              <div className='card__up'>
                <div className='card__profession'>
                  {card.profession}
                </div>
                <img className='card__avatar' src={card.avatar} alt="" />
                <div className='card__main'>
                  <div className='card__name'>
                    {card.name}
                  </div>
                  <div className='card__rating'>
                    <div className='card__stars'>
                      {this.renderRating(card.rating)}
                    </div>
                    {card.rating}/5
                </div>
                  <div className='card__certified'>
                    {this.renderCertified(card.certified)}
                  </div>
                </div>
                <div className='card__secondary'>
                  <div className='card__opinions'>
                    <FontAwesome name='comment-alt' /> {card.opinions} Opiniones
                </div>
                  <div className='card__address'>
                    <FontAwesome name='map-marker-alt' /> {card.address}
                  </div>
                </div>
              </div>
              <div className='card__down'>
                <div className='card__button'>
                  Seleccionar
            </div>
              </div>
            </Paper>
          </div>
        )
      })
      return cards
    }
  };

  render() {
    return (
      <div className="results__wrapper">
        <div className='sticky__searcher visible' onClick={() => { this.goForm() }}>Buscar profesionales
          <FontAwesome name="search" />
        </div>
        <div className="results__main">
          <div className="filter__wrapper">
            <form>
              <p className="filter__title">Filtrar por</p>
              <Checkbox
                label="Que tengan opiniones"
                checked={this.state.checkOpinion}
                onCheck={this.updateCheckOpinion.bind(this)}
              />
              <Checkbox
                label="Solo empresas certificadas"
                checked={this.state.checkedCertified}
                onCheck={this.updateCheckCertified.bind(this)}
              />
              <div className="general-button" onClick={this.fetchResults.bind(this)}>Aplica filtro</div>
            </form>
            <div className="map__toggle" style={style.switch}>
              <Toggle
                label="Mapa"
                style={style.toggle}
                labelStyle={style.labelStyle}
              />
            </div>
          </div>
          <div className="card-list__wrapper">
            {this.renderCard()}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const props = {
    professionName: getSelectProfession(state),
    cityName: getSelectCity(state),
    areaName: getSelectArea(state),
    professionals: getResults(state)
  }
  if (props.professionName) {
    props.professionCode = getProfessionCode(state, props.professionName)
  }
  if (props.cityName) {
    props.cityCode = getCityCode(state, props.cityName)
  }
  if (props.areaName) {
    props.areaCode = getAreaCode(state, props.areaName)
  }
  return props
}

Results.contextTypes = {
  router: React.PropTypes.object
}

export default connect(mapStateToProps, actions)(Results)
