import { Affix } from 'antd';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Signup from './components/auth/Signup';
import Signin from './components/auth/Signin';
// import Forum from './components/forum/forum'
import Home from './components/Home'
import Navbar from './components/navbar';
import Landing from './components/Landing';
import UserForm from './components/auth/UserForm';

function App() {
  return (
    <div className="App">
      <Router>
          <Route exact path='/' component={Landing} />
          <Affix offsetTop={0}>
            <Navbar />
          </Affix>
        <Switch>
          <Route path='/home' component={Home} />
          <Route path='/signin' component={Signin} />
          <Route path='/signup/userForm' component={UserForm} />
          <Route path='/signup' component={Signup} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
