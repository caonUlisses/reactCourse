import React, { Component } from 'react'
import Chart from './../components/chart.js'
import _ from 'lodash'
import GoogleMap from './../components/google-map.js'

import { connect } from 'react-redux'

export class WeatherList extends Component {
  renderWeather (cityData) {
    const name = cityData.city.name
    const temps = _.map(cityData.list.map(weather => weather.main.temp), (temp) => temp - 273)
    const humidities = cityData.list.map(weather => weather.main.humidity)
    const pressures = cityData.list.map(weather => weather.main.pressure)
    const { lon, lat } = cityData.city.coord

    return (
      <tr key={name}>
        <td><GoogleMap lon={lon} lat={lat} /></td>
        <td>
          <Chart data={temps} color={'orange'} unity='C' />
        </td>
        <td>
          <Chart data={pressures} color={'green'} unity='hPa' />
        </td>
        <td>
          <Chart data={humidities} color={'blue'} unity='%' />
        </td>

      </tr>
    )
  }

  render () {
    return (
      <table className='table table-hover'>
        <thead>
          <tr>
            <th>City </th>
            <th>Temperature (C)</th>
            <th>Pressure (hPa)</th>
            <th>Humidity (%)</th>
          </tr>
        </thead>
        <tbody>
          {this.props.weather.map(this.renderWeather)}
        </tbody>
      </table>

    )
  }
}

function mapStateToProps ({ weather }) {
  return { weather }
}

export default connect(mapStateToProps)(WeatherList)
