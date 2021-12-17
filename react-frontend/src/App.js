import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import UserComponent from './components/UserComponent';
import Header from './components/Header';
import AddEmployee from './components/AddEmployee';

function App() {
  return (
    <div>
      <Router>

        <Header />
        <div className="container">
          <Switch>
            <Route path="/" exact component={UserComponent}></Route>
            <Route path="/employees" component={UserComponent}></Route>
            <Route path="/addEmployee" component={AddEmployee}></Route>
            <Route path="/updateEmployee" component={AddEmployee}></Route>
            {/* <UserComponent /> */}
          </Switch>
        </div>

      </Router>
    </div>
  );
}

export default App;
