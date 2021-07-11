import React from 'react'
import './App.css';
import Login from './Component/Login'
import List from './Component/List'

import ProtectedRoute from './Component/ProtectedRoute';
import {BrowserRouter as Router,Route, Switch,} from "react-router-dom";

function App() {
  return (
    <Router>
            <Switch>
              <Route exact path="/" component={Login} />
              <ProtectedRoute exact path="/List" component={List} />
            </Switch>
          </Router>
  );
}

export default App;
