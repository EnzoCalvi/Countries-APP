const initialState = {
  countries: [],
  countryDetails: [],
  loading: false,
  activities: [],
};

function ordAZ(a, b) {
  if (a.name < b.name) return -1;
  if (b.name < a.name) return 1;
  return 0;
}

function ordPop(a, b) {
  return a.population - b.population;
}

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_COUNTRIES":
      return {
        ...state,
        countries: action.payload,
      };
    case "GET_DETAILS":
      return {
        ...state,
        countryDetails: action.payload,
      };
    case "GET_NAME":
      return {
        ...state,
        countries: action.payload,
      };
    case "ORDER_AZ":
      return {
        ...state,
        countries: state.countries.slice().sort(ordAZ),
      };
    case "ORDER_ZA":
      return {
        ...state,
        countries: state.countries.slice().sort(ordAZ).reverse(),
      };
    case "ORDER_POP":
      return {
        ...state,
        countries: state.countries.slice().sort(ordPop),
      };
    case "ORDER_POP_REVERSE":
      return {
        ...state,
        countries: state.countries.slice().sort(ordPop).reverse(),
      };
    case "ORDER_CONTINENT":
      return {
        ...state,
        countries: state.countries.filter(
          (el) => el.continent === action.payload
        ),
      };
    case "SHOW_ACTIVITY":
      return {
        ...state,
        countries: state.countries.filter((el) => {
          return el.activities.some((el) => el.name === action.payload);
        }),
      };
    case "LOADING":
      return {
        ...state,
        loading: !state.loading,
      };
    case "GET_ACTIVITIES":
      return {
        ...state,
        activities: action.payload,
      };
    case "GET_ACTIVITY":
      return {
        ...state,
        countries: state.activities.find((el) => el.season === action.payload)
          .countries,
      };
    default:
      return state;
  }
};

export default rootReducer;
