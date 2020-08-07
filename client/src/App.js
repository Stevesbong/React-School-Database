import React from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';

import Header from './components/Header';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import UserSignOut from './components/UserSignOut';
import CreateCourse from './components/CreateCourse';

import withContext from './Context';

const HeaderWithContext = withContext(Header);
const CoursesWithContext = withContext(Courses);
const CourseDetailWithContext = withContext(CourseDetail);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignOutWithContext = withContext(UserSignOut);
const CreateCourseWithContext = withContext(CreateCourse);

function App() {

  return (
    <BrowserRouter>
    <div className="App">
      <HeaderWithContext />

      <Switch>
        <Route exact path='/' render={ ()=> <Redirect to='/courses' />} />
        <Route exact path='/courses' component = { CoursesWithContext } />
        <Route exact path='/courses/create' component = { CreateCourseWithContext } />
        <Route path='/courses/:id' component = { CourseDetailWithContext } />
        <Route exact path='/signin' component = { UserSignInWithContext } />
        <Route exact path='/signup' component = { UserSignUpWithContext } />
        <Route exact path='/signout' component = { UserSignOutWithContext } />

        {/* <Route component={NotFound} /> */}
      </Switch>

    </div>
    </BrowserRouter>
  );
}

export default App;