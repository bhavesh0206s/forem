import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
// import Forum from './components/forum/forum'
import Landing from './components/Landing'

function App() {
  return (
    <div className="App">
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
