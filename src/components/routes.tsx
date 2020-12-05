import React from "react";
import { Switch, Route } from "react-router-dom";
import { HomePage } from "../container/index";

const Main = () => {
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
    </Switch>
  );
};

export default Main;
