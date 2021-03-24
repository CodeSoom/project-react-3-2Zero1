import React from 'react'
import { useSelector } from 'react-redux';
import EntrancePage from './EntrancePage';

import {
  Switch,
  Route,
  Link,
} from 'react-router-dom';

export default function App() {

  const { entrance } = useSelector((state) => ({
    entrance: state.entrance
  }));

  const { sender, postcardCount, writtenCount, isPrivate } = entrance;

  return (
    <Switch>
        <Route exact path="/entrance" component={EntrancePage} />
        {/* <Route component={NotFoundPage} /> */}
      </Switch>
  );
}
