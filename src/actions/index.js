import axios from 'axios'

const API_BASE_URL = `http://localhost:3000`

export const GET_PROFESSION_OPTIONS = 'GET_PROFESSION_OPTIONS'
export const GET_CITY_OPTIONS = 'GET_CITY_OPTIONS'
export const GET_AREA_OPTIONS = 'GET_AREA_OPTIONS'
export const SELECT_PROFESSION = 'SELECT_PROFESSION'
export const SELECT_CITY = 'SELECT_CITY'
export const SELECT_AREA = 'SELECT_AREA'
export const GET_RESULTS = 'GET_RESULTS'

export function getProfessionOptions() {
  return (dispatch) => {
    const urlSearch = `${API_BASE_URL}/professionalTypes`
    axios.get(urlSearch).then((response) => {
      dispatch(_getProfessionOptions(response.data))
    })
  }
}

function _getProfessionOptions(data) {
  return {
    type: GET_PROFESSION_OPTIONS,
    payload: data
  }
}

export function getCityOptions() {
  return (dispatch) => {
    const urlSearch = `${API_BASE_URL}/cities`
    axios.get(urlSearch).then((response) => {
      dispatch(_getCityOptions(response.data))
    })
  }
}

function _getCityOptions(data) {
  return {
    type: GET_CITY_OPTIONS,
    payload: data
  }
}

export function getAreaOptions() {
  return (dispatch) => {
    const urlSearch = `${API_BASE_URL}/areas`
    axios.get(urlSearch).then((response) => {
      dispatch(_getAreaOptions(response.data))
    })
  }
}

function _getAreaOptions(data) {
  return {
    type: GET_AREA_OPTIONS,
    payload: data
  }
}

export function selectProfession(profession) {
  return {
    type: SELECT_PROFESSION,
    payload: profession
  }
}

export function selectCity(city) {
  return {
    type: SELECT_CITY,
    payload: city
  }
}

export function selectArea(area) {
  return {
    type: SELECT_AREA,
    payload: area
  }
}

export function fetchResults(professionCode, cityCode, areaCode, certified, hasOpinions) {
  return (dispatch) => {
    let params = { code: professionCode, cityCode, areaCode, certified, hasOpinions }
    const urlSearch = `${API_BASE_URL}/professionals`
    axios.get(urlSearch, { params }).then((response) => {
      dispatch(_fetchResults(response.data))
    })
  }
}

function _fetchResults(data) {
  return {
    type: GET_RESULTS,
    payload: data
  }
}
