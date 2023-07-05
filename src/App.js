import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import RecordsComponent from "./components/records/RecordsComponent";
import CalculatorComponent from "./components/operations/CalculatorComponent";
import LoginComponent from "./components/login/LoginComponent";

function App() {
  return (
      <div className="container">
        <Router>
          <div className="col-md-6">
            <h1 className="text-center" style={style}>Arithmetic Calculator</h1>
            <Switch>
              <Route path="/" exact component={LoginComponent} />
              <Route path="/login" exact component={LoginComponent} />
              <Route path="/records" component={RecordsComponent} />
              <Route path="/perform-calculation" component={CalculatorComponent} />
            </Switch>
          </div>
        </Router>
      </div>
  );
}


const style = {
  color: 'green',
  margin: '10px'
}
export default App;
