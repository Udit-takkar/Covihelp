import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Landing from "./components/Landing Page/Landing";
import SearchableMap from "./components/MapContainer";
import Footer from "./components/Footer";
import AuthenticatedRoute from "./AuthenticatedRoute";
import MyProfile from "./components/MyProfile";

function App() {
  const isUserStaff = false;
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route path="/signup" component={SignUp} />
          <Route path="/login" component={Login} />
          {/* <Route path="/locations/:id" component={LocationShowPage} /> */}
          <Route path="/locations" component={SearchableMap} />
          {!isUserStaff && (
            <AuthenticatedRoute path="/myprofile" component={MyProfile} />
          )}
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
