import React from "react";
import { connect } from "react-redux";
import { getDetails } from "redux/actions/index";
import styles from "./Details.module.css";
import Activity from "./Activities/Activities";
import { Link } from "react-router-dom";

class Details extends React.Component {
  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.getDetails(id);
  }

  render() {
    return (
      <div>
        <div className={styles.detail}>
          <div className={styles.head}>
            <Link to="/main">
              <button>Volver</button>
            </Link>
            <h1>{this.props.country.name}</h1>
          </div>
          <div className={styles.flag}>
            <img src={this.props.country.flag} alt="Country-flag" />
          </div>
          <table className={styles.properties}>
            <tbody>
              <tr>
                <td>
                  <span>Nombre oficial: </span>
                </td>
                <td>{this.props.country.official_name}</td>
              </tr>
              <tr>
                <td>
                  <span>Capital: </span>
                </td>
                <td>{this.props.country.capital}</td>
              </tr>
              <tr>
                <td>
                  <span>Continente: </span>
                </td>
                <td>{this.props.country.continent}</td>
              </tr>
              <tr>
                <td>
                  <span>Subregión: </span>
                </td>
                <td>{this.props.country.subregion}</td>
              </tr>
              <tr>
                <td>
                  <span>Población: </span>
                </td>
                <td>{this.props.country.population}</td>
              </tr>
              <tr>
                <td>
                  <span>Territorio: </span>
                </td>
                <td>{this.props.country.area} KM</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className={styles.detail}>
          <div className={styles.activity}>
            <h1>Actividades</h1>
            <Link to="/activities">
              <button>Crear actividad</button>
            </Link>
          </div>
          <Activity activities={this.props.country.activities} />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    country: state.countryDetails,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getDetails: (id) => dispatch(getDetails(id)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Details);
