import "./App.css";
import { Route } from "react-router-dom";
import React, { useEffect } from "react";
import Countries from "./views/Home/Countries/Countries";
import Details from "./views/Details/Details";
import ActivityForm from "views/CreateActivity/CreateActivity";
import { useDispatch } from "react-redux";
import { getActivities, getCountries } from "./redux/actions";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCountries());
    dispatch(getActivities());
  }, [dispatch]);

  return (
    <React.Fragment>
      <Route exact path="/" component={Countries} />
      <Route exact path="/country/:id" component={Details} />
      <Route exact path="/activities" component={ActivityForm} />
    </React.Fragment>
  );
}

export default App;
