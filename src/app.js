import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import User from './pages/user';
import Login from './pages/login';
import Logout from './pages/logout';
import ReposList from './pages/repo/list';
import RepoDetail from './pages/repo/detail';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/repo/:name/:repoName">
          <RepoDetail />
        </Route>
        <Route path="/:login/repos">
          <ReposList />
        </Route>
        <Route path="/logout">
          <Logout />
        </Route>
        {/* Note `/:login` route should be placed before `/`
            so that route will render when viewing a logged-in user.  */}
        <Route path="/:login">
          <User />
        </Route>
        <Route path="/">
          <Login />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
