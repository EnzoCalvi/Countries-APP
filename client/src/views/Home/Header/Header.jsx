import React, { Component } from "react";
import { connect } from "react-redux";
import styles from "./Header.module.css";
import * as actions from "redux/actions/index";
import { Link } from "react-router-dom";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      order: "all",
      continent: "all",
      activity: "all",
    };
  }

  handleSearch(event) {
    this.props.getName(event.target.value);
    this.setState({ order: "all", continent: "all", activity: "all" });
  }

  handleContinent(event) {
    this.props.getCountries();
    setTimeout(() => {
      this.props.getContinent(event.target.value);
    }, 100);
  }

  handleFilter(event) {
    this.setState((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
    this.props.getCountries();
    this.props.setLoading();

    setTimeout(() => {
      if (this.state.continent !== "all") {
        setTimeout(() => {
          this.props.getContinent(this.state.continent);
        }, 200);
      }
      if (this.state.order !== "all") {
        setTimeout(() => {
          this.props.filter(this.state.order);
        }, 200);
      }
      if (this.state.activity !== "all") {
        setTimeout(() => {
          this.props.getActivity(parseInt(this.state.activity));
        }, 200);
      }
    }, 100);
  }

  render() {
    return (
      <div className={styles.header}>
        <input
          type="text"
          onChange={(e) => this.handleSearch(e)}
          autoComplete="off"
          className={styles.search}
          placeholder="Buscar país por nombre..."
        />

        <select
          onChange={(e) => this.handleFilter(e)}
          name="continent"
          className={styles.select}
          disabled={this.state.activity === "all" ? false : true}
          value={this.state.continent}
        >
          <option value="all">Continente</option>
          <option value="Americas">Americas</option>
          <option value="Europe">Europe</option>
          <option value="Africa">Africa</option>
          <option value="Oceania">Oceania</option>
          <option value="Asia">Asia</option>
        </select>
        <select
          onChange={(e) => this.handleFilter(e)}
          className={styles.select}
          name="order"
          disabled={this.state.activity === "all" ? false : true}
          value={this.state.order}
        >
          <option value="all" defaultValue>
            Ordenar
          </option>
          <option value="az">A-Z</option>
          <option value="za">Z-A</option>
          <option value="popAsc">↑ Población</option>
          <option value="popDesc">↓ Población</option>
        </select>
        <select
          onChange={(e) => this.handleFilter(e)}
          className={styles.select}
          name="activity"
          value={this.state.activity}
        >
          <option value="all" defaultValue>
            Actividades
          </option>
          {this.props.activities &&
            this.props.activities.map((activity) => (
              <option key={activity.id} value={activity.id}>
                {activity.name}
              </option>
            ))}
        </select>
        <Link to="/activities">
          <button className={styles.select}>Crear actividad</button>
        </Link>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCountries: () => dispatch(actions.getCountries()),
    getContinent: (continent) => dispatch(actions.getContinent(continent)),
    getName: (name) => dispatch(actions.getName(name)),
    getActivity: (id) => dispatch(actions.getActivity(id)),
    filter: (order) => dispatch(actions.filter(order)),
    setLoading: () => dispatch(actions.setLoading()),
  };
};
const mapStateToProps = (state) => {
  return {
    countries: state.countries,
    activities: state.activities,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
