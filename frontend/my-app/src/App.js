import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./Components/Header";
import SignUp from "./Components/SignUp";
import Login from "./Components/Login";

function App() {
  useEffect(() => {}, []);

  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" />
          <Route path="/signup" component={SignUp} />
          <Route path="/login" component={Login} />
          <Route path="/locations/:id" />
          <Route path="/locations" />
        </Switch>
        {/* <Footer /> */}
      </Router>
    </div>
  );
}

export default App;
