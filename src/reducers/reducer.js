import _ from 'lodash'
import { GET_PROFESSION_OPTIONS, GET_CITY_OPTIONS, GET_AREA_OPTIONS, SELECT_PROFESSION, SELECT_CITY, SELECT_AREA, GET_RESULTS } from '../actions'

export default function (state = [], action) {
  switch (action.type) {
    case GET_PROFESSION_OPTIONS:
      return { ...state, professions: action.payload }
    case GET_CITY_OPTIONS:
      return { ...state, cities: action.payload }
    case GET_AREA_OPTIONS:
      return { ...state, areas: action.payload }
    case SELECT_PROFESSION:
      return { ...state, professionSelected: action.payload }
    case SELECT_CITY:
      return { ...state, citySelected: action.payload }
    case SELECT_AREA:
      return { ...state, areaSelected: action.payload }
    case GET_RESULTS:
      return { ...state, results: action.payload }
  }
  return state
}

export function getProfessionOptions(state) {
  return state.appReducer.professions
}

export function getCityOptions(state) {
  return state.appReducer.cities
}

export function getAreaOptions(state) {
  return state.appReducer.areas
}

export function getProfessionCode(state, professionName) {
  const profession = _.find(state.appReducer.professions, function (profession) {
    return profession.name === professionName
  })
  if (profession) return profession.code
}

export function getCityCode(state, cityName) {
  const city = _.find(state.appReducer.cities, function (city) {
    return city.name === cityName
  })
  if (city) return city.code
}

export function getAreaCode(state, areaName) {
  const area = _.find(state.appReducer.areas, function (area) {
    return area.name === areaName
  })
  if (area) return area.code
}

export function getSelectProfession(state) {
  return state.appReducer.professionSelected
}

export function getSelectCity(state) {
  return state.appReducer.citySelected
}

export function getSelectArea(state) {
  return state.appReducer.areaSelected
}

export function getResults(state) {
  return state.appReducer.results
}