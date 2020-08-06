import React, { useState, useEffect } from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';

import Header from './components/Header';
import Courses from './components/Courses';

import withContext from './Context';

const CoursesWithContext = withContext(Courses);
const HeaderWithContext = withContext(Header);

function App() {

  return (
    <BrowserRouter>
    <div className="App">
      <HeaderWithContext />

      <Switch>
        <Route exact path='/' render={ ()=> <Redirect to='/courses' />} />
        <Route exact path='/courses' component={ CoursesWithContext } />

        {/* <Route component={NotFound} /> */}
      </Switch>

    </div>
    </BrowserRouter>
  );
}

export default App;