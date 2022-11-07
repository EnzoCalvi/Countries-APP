import React from "react";
import { createActivity, getName } from "redux/actions";
import { connect } from "react-redux";
import { Component } from "react";
import styles from "./CreateActivity.module.css";
import { Link } from "react-router-dom";

export function validate(input) {
  let error = { submit: false };

  if (!input.name) {
    error.name = "Por favor ingresar un nombre";
    error.submit = true;
  } else if (/[^A-z ]/.test(input.name)) {
    error.name = "Caracter invalido detectado";
    error.submit = true;
  }

  if (!input.duration) {
    error.duration = "Ingrese la duracion";
    error.submit = true;
  } else if (input.duration < 0) {
    error.duration = "Duracion invalida";
    error.submit = true;
  }

  return error;
}

class CreateActivity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      duration: "",
      search: "",
      dificulty: "",
      season: "",
      countries: [],
      countries_selected: [],
      error: {},
      submit: true,
    };
  }

  handleChange(event) {
    this.setState((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));

    let error = validate({
      ...this.state,
      [event.target.name]: event.target.value,
    });

    this.setState((prev) => ({
      ...prev,
      error: error,
      submit: error.submit,
    }));
  }

  handleSearch(event) {
    this.setState({ search: event.target.value });
    this.props.getName(this.state.search);
  }

  addCountry(event) {
    event.preventDefault();
    this.setState({
      countries: [...this.state.countries, event.target.value.split(",")[0]],
      countries_selected: [
        ...this.state.countries_selected,
        {
          name: event.target.value.split(",")[1],
          code: event.target.value.split(",")[0],
        },
      ],
    });
  }

  removeCountry(event) {
    this.setState({
      countries: this.state.countries.filter((el) => {
        return el !== event.target.value;
      }),
      countries_selected: this.state.countries_selected.filter((el) => {
        return el.code !== event.target.value;
      }),
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    let newActivity = {
      name: this.state.name,
      duration: this.state.duration,
      dificulty: this.state.dificulty,
      season: this.state.season,
      countryID: this.state.countries,
    };
    this.props.createActivity(newActivity);
    this.setState({
      name: "",
      duration: "",
      search: "",
      dificulty: "",
      season: "",
      countries: [],
      countries_selected: [],
      error: {},
      submit: true,
    });

    alert("Actividad Creada");
  }

  render() {
    const { name, duration, dificulty, season, search, error } = this.state;
    return (
      <form
        className={styles.form}
        onSubmit={(e) => this.handleSubmit(e)}
        method="post"
      >
        <div className={styles.head}>
          <Link to="/">
            <button>Volver</button>
          </Link>
          <h1>Crear Actividad</h1>
        </div>
        <input
          type="text"
          name="name"
          onChange={(e) => this.handleChange(e)}
          value={name}
          placeholder="Nombre de la actvidad *"
        />
        {error && <p>{error.name}</p>}
        <input
          type="number"
          id="duration"
          onChange={(e) => this.handleChange(e)}
          value={duration}
          placeholder="Duración de la actividad *"
          name={"duration"}
        />
        {error.duration && <p className="danger">{error.duration}</p>}
        <br />
        <select
          id="dificulty"
          onChange={(e) => this.handleChange(e)}
          name={"dificulty"}
          value={dificulty}
        >
          <option value={"0"}>Seleccionar nivel de dificultad</option>
          <option value={"1"}>Muy baja</option>
          <option value={"2"}>Baja</option>
          <option value={"3"}>Media</option>
          <option value={"4"}>Alta</option>
          <option value={"5"}>Muy Alta</option>
        </select>
        <br />
        <select
          id="season"
          onChange={(e) => this.handleChange(e)}
          name={"season"}
          value={season}
        >
          <option value={"Todas"}>Seleccionar estación del año</option>
          <option value={"Verano"}>Verano</option>
          <option value={"Otoño"}>Otoño</option>
          <option value={"Invierno"}>Invierno</option>
          <option value={"Primavera"}>Primavera</option>
        </select>
        <br />
        <input
          type="text"
          onChange={(e) => this.handleSearch(e)}
          autoComplete="off"
          placeholder="Agregar paises a la actividad *"
          name="search"
          value={search}
        />
        <ul className={styles.search}>
          {this.props.countries &&
            this.props.countries.slice(0, 5).map((country) => (
              <li key={country.id}>
                <button
                  value={country.id + "," + country.name}
                  onClick={(e) => this.addCountry(e)}
                  className={styles.add}
                >
                  {country.name}
                </button>
              </li>
            ))}
        </ul>

        <br></br>
        <ul className={styles.added}>
          {this.state.countries_selected &&
            this.state.countries_selected.map((country) => (
              <li key={country.name}>
                {country.name}
                <button
                  value={country.code}
                  onClick={(e) => this.removeCountry(e)}
                  className={styles.del}
                >
                  X
                </button>
              </li>
            ))}
        </ul>
        <br></br>
        <input
          type={"submit"}
          disabled={this.state.submit}
          value="Crear actividad"
        />
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    countries: state.countries,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getName: (name) => dispatch(getName(name)),
    createActivity: (activity) => dispatch(createActivity(activity)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateActivity);
