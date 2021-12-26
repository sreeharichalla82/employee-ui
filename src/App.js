import logo from './logo.svg';
import './App.css';
import EmployeeList from './components/employee-list';
import { Routes ,Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import AddEmployee from './components/add-employee';


function App() {
  return (
    <div className="App">
      <Router>
        <div className='container'>
        <Switch>
            <Route path="/" exact component={EmployeeList}></Route>
            <Route path="/employees" component={EmployeeList}></Route>
            <Route path="/alteremployee/:action/:empId" component={AddEmployee}></Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
