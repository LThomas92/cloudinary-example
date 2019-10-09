import React from "react";
import "./App.css";
import { Router, Route, Switch } from "react-router-dom";

//COMPONENTS
import AllImages from "./components/AllImages";
import Form from "./components/Form";
import Header from "./components/Header";

import history from "./history";

const App = () => {
  return (
    <div>
      <Router history={history}>
        <Header />
        <Switch>
          <Route path="/" exact component={AllImages} />
          <Route path="/add" component={Form} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
