import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions/index.js'
import NavBar from './../components/NavBar'
import IconButton from 'material-ui/IconButton'
import NavigationClose from 'material-ui/svg-icons/navigation/close'
import AutoComplete from 'material-ui/AutoComplete'

import { getProfessionOptions, getCityOptions, getAreaOptions, getSelectProfession, getSelectCity, getSelectArea } from '../reducers/reducer'

const styles = {
  autocomplete: {
    display: 'block',
    width: '100%',
    textAlign: 'center'
  }
}

class Form extends Component {
  componentDidMount() {
    if (!this.props.professionOptions) {
      this.props.getProfessionOptions()
    }
    if (!this.props.cityOptions) {
      this.props.getCityOptions()
    }
    if (!this.props.areaOptions) {
      this.props.getAreaOptions()
    }
  }

  goBack = () => {
    this.context.router.push('/')
  }

  professions = () => {
    let array = []
    this.props.professionOptions.map((profession) => {
      array.push(profession.name)
    })
    return array
  }

  handleUpdateProfession = profession => {
    this.props.selectProfession(profession)
  }

  cities = () => {
    let array = []
    this.props.cityOptions.map((city) => {
      array.push(city.name)
    })
    return array
  }

  handleUpdateCity = city => {
    this.props.selectCity(city)
  }

  arrayAreas = (citySelected) => {
    let citySel = ''
    this.props.cityOptions.map(city => {
      if (city.name === citySelected) {
        citySel = city.code
      }
    })
    let array = []
    this.props.areaOptions.map((area) => {
      if (citySel === area.city) {

        array.push(area.name)
      }
    })
    return array
  }

  handleUpdateArea = area => {
    this.props.selectArea(area)
  }

  search = () => {
    this.context.router.push('/results')
  }

  render() {
    if (this.props.professionOptions && this.props.cityOptions && this.props.areaOptions) {
      return (
        <div className="form__wrapper">
          <NavBar
            key={'navbar__form'}
            title="Encuentra profesionales"
            iconleft={<IconButton><NavigationClose onClick={() => { this.goBack() }} /></IconButton>}>
          </NavBar>
          <form>
            <div className="autocomplete__wrapper">
              <AutoComplete
                hintText="Qué profesional buscas?"
                searchText={this.props.profession}
                onUpdateInput={(value) => this.handleUpdateProfession(value)}
                dataSource={this.professions()}
                value={this.props.profession}
                filter={AutoComplete.caseInsensitiveFilter}
                openOnFocus={true}
                style={styles.autocomplete}
              />
              <AutoComplete
                hintText="En qué ciudad?"
                searchText={this.props.city}
                onUpdateInput={(value) => this.handleUpdateCity(value)}
                dataSource={this.cities()}
                value={this.props.city}
                filter={AutoComplete.caseInsensitiveFilter}
                openOnFocus={true}
                style={styles.autocomplete}
              />
              <AutoComplete
                hintText="En qué área?"
                searchText={this.props.area}
                onUpdateInput={(value) => this.handleUpdateArea(value)}
                dataSource={this.arrayAreas(this.props.city)}
                value={this.props.area}
                filter={AutoComplete.caseInsensitiveFilter}
                openOnFocus={true}
                style={styles.autocomplete}
              />
              <div className="general-button" onClick={() => { this.search() }}>Busca Profesionales</div>
            </div>
          </form>
        </div>
      )
    }
    else {
      return (
        <div>Loading ...</div>
      )
    }
  }
}

const mapStateToProps = (state) => {
  const props = {
    professionOptions: getProfessionOptions(state),
    cityOptions: getCityOptions(state),
    areaOptions: getAreaOptions(state),
    profession: getSelectProfession(state),
    city: getSelectCity(state),
    area: getSelectArea(state)
  }
  return props
}

Form.contextTypes = {
  router: React.PropTypes.object
}

export default connect(mapStateToProps, actions)(Form)
