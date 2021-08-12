import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import SignIn from './components/SignIn';
import Register from './components/Register';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path='/' render={() => <Redirect to='/signin'/>} />
          <Route path="/signin" component={SignIn} />
          <Route path="/register" component={Register} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
