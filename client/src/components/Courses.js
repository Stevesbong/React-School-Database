import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Course from './Course';

export default class Courses extends Component {

    state = {
        courses: [],
    }

    componentDidMount() {
        const { context } = this.props;
        context.data.getCourses()
        .then(response => {
            this.setState({
                courses:response.courses
            })
        })
    }

    render() {
        const { courses } = this.state;

        return (
            <div className="bounds">

                { !courses ? ( <h3 className="course--add--title">Not Found page need.</h3>)
                : ( courses.map(course => 
                    <Course 
                        key={course.id}
                        title={course.title}
                        id={course.id}
                    />)
                ) }
                
                <div className="grid-33">
                    <Link className="course--module course--add--module" to='/courses/create'>
                        <h3 className="course--add--title">
                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                            viewBox="0 0 13 13" className="add">
                            <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
                        </svg> New Course
                        </h3>
                    </Link>
                </div>
            </div>
        )
    }
}
