import axios from "axios";

export function getCountries() {
  return async (dispatch) => {
    const response = await axios.get(`/countries`);
    return dispatch({
      type: "GET_COUNTRIES",
      payload: response.data,
    });
  };
}

export function getDetails(id) {
  return async (dispatch) => {
    const response = await axios.get(`/countries/${id}`);
    return dispatch({
      type: "GET_DETAILS",
      payload: response.data,
    });
  };
}

export function getName(name) {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/countries?name=${name}`);
      return dispatch({
        type: "GET_NAME",
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function filter(order) {
  if (order === "az") return { type: "ORDER_AZ" };
  else if (order === "za") return { type: "ORDER_ZA" };
  else if (order === "popAsc") return { type: "ORDER_POP" };
  else if (order === "popDesc") return { type: "ORDER_POP_REVERSE" };
}

export function getContinent(payload) {
  return {
    type: "ORDER_CONTINENT",
    payload,
  };
}

export function showActivity(payload) {
  return {
    type: "SHOW_ACTIVITY",
    payload,
  };
}

export function createActivity(activity) {
  return async function () {
    try {
      const newActivity = await axios.post("/activity/", activity);
      console.log("Creando la activity: ", newActivity);
    } catch (error) {
      console.log(error);
    }
  };
}

export function setLoading() {
  return {
    type: "LOADING",
  };
}

export function getActivities() {
  return async (dispatch) => {
    const response = await axios.get(`/activity`);
    const mapped = response.data.map((el) => {
      return { season: el.season, countries: el.countries };
    });
    return dispatch({
      type: "GET_ACTIVITIES",
      payload: mapped,
    });
  };
}

export function getActivity(season) {
  return { type: "GET_ACTIVITY", payload: season };
}
