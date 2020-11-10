import React, { Fragment } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Forum from './components/forum/forum'
import Landing from './components/common/Landing'

function App() {
  return (
    <div className="App">
      <Router>
        <Fragment>
          {/* <Route exact path='/' component={Landing} /> */}
          <Switch>
            <Route path='/forum' component={Forum} />
          </Switch>
        </Fragment>
      </Router>
    </div>
  );
}

export default App;
