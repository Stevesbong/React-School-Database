import React from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';

// Nav, Course, and User Component
import Header from './components/Header';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import UserSignOut from './components/UserSignOut';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';

// Error handling component
import UnhandledError from './components/UnhandledError';
import NotFound from './components/NotFound';
import Forbidden from './components/Forbidden';

// High Order Component
import withContext from './Context';
import PrivateRoute from './PrivateRoute';

// Header component with context
const HeaderWithContext = withContext(Header);

// Course route with context
const CoursesWithContext = withContext(Courses);
const CourseDetailWithContext = withContext(CourseDetail);
const CreateCourseWithContext = withContext(CreateCourse);
const UpdateCourseWithContext = withContext(UpdateCourse);

// User route with context
const UserSignInWithContext = withContext(UserSignIn);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignOutWithContext = withContext(UserSignOut);

function App() {

  return (
    <BrowserRouter>
    <div className="App">
      <HeaderWithContext />

      <Switch>
        {/* Root Route */}
        <Route exact path='/' render={ ()=> <Redirect to='/courses' />} />

        {/* Course Route */}
        <Route exact path='/courses' component = { CoursesWithContext } />
        <PrivateRoute path='/courses/create' component = { CreateCourseWithContext } />
        <Route exact path='/courses/:id' component = { CourseDetailWithContext } />
        <PrivateRoute path='/courses/:id/update' component = { UpdateCourseWithContext } />

        {/* User Route */}
        <Route exact path='/signin' component = { UserSignInWithContext } />
        <Route exact path='/signup' component = { UserSignUpWithContext } />
        <Route exact path='/signout' component = { UserSignOutWithContext } />

        {/* Error Handling Route */}
        <Route path='/forbidden' component = { Forbidden } />
        <Route path='/error' component = { UnhandledError } />
        <Route component = { NotFound } />
      </Switch>

    </div>
    </BrowserRouter>
  );
}

export default App;