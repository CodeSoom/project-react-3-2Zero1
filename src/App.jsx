import React from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';

import EntrancePage from './page/EntrancePage';
import WritePage from './page/WritePage';
import PostcardPage from './page/PostcardPage';
import TestPage from './page/TestPage';

export default function App() {
  return (
    <Switch>
      <Route exact path="/write/:index" component={WritePage} />
      <Route exact path="/postcard" component={PostcardPage} />
      <Route exact path="/:key" component={EntrancePage} />
      <Route exact path="/" component={TestPage} />

      {/* <Route component={NotFoundPage} /> */}
    </Switch>
  );
}
