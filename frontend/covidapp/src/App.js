import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Login from "./components/Login";
import SignUp from "./components/SignUp";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={SignUp} />
          <Route path="/signup" component={SignUp} />
          <Route path="/login" component={Login} />
          {/* <Route path="/locations/:id" component={LocationShowPage} />
          <Route path="/locations" component={MapContainer} /> */}
        </Switch>
        {/* <Footer /> */}
      </Router>
    </div>
  );
}

export default App;
