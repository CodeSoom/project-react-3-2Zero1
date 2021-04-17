import React from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';

import EntrancePage from './page/EntrancePage';
import WritePage from './page/WritePage';
import PostcardPage from './page/PostcardPage';
import PostcardsPage from './page/PostcardsPage';
import NotFoundPage from './page/NotFoundPage';

import PageMoveManager from './middleware/PageMoveManager';
import ToastManager from './middleware/ToastManager';

export default function App() {
  return (
    <>
      <PageMoveManager />
      <ToastManager />
      <Switch>
        <Route exact path="/write/:index" component={WritePage} />
        <Route exact path="/postcards" component={PostcardsPage} />
        <Route exact path="/postcard" component={PostcardPage} />
        <Route exact path="/entrance/:key" component={EntrancePage} />
        <Route exact path="/" component={EntrancePage} />
        <Route component={NotFoundPage} />
      </Switch>
    </>
  );
}
