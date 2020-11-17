import { Affix } from 'antd';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
// import Forum from './components/forum/forum'
import Landing from './components/Landing'
import Navbar from './components/navbar';

function App() {
  return (
    <div className="App">
      <Affix offsetTop={0}>
        <Navbar />
      </Affix>
      <Router>
        
        <Switch>
          <Route exact path='/' component={Landing} />
          {/* <Route path='/forum' component={Forum} /> */}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
