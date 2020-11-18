import { Affix } from 'antd';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Signup from './components/auth/Signup';
import Signin from './components/auth/Signin';
// import Forum from './components/forum/forum'
import Landing from './components/Landing'
import Navbar from './components/navbar';

function App() {
  return (
    <div className="App">
      <Router>
          <Affix offsetTop={0}>
            <Navbar />
          </Affix>
          <Route exact path='/' component={Landing} />
          <Route exact path='/signup' component={Signup} />
          <Route exact path='/signin' component={Signin} />
        <Switch>
          {/* <Route path='/forum' component={Forum} /> */}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
