import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

export default class CourseDetail extends Component {

    constructor(props) {
        super(props)
        this.state = {
            id:'',
            title:'',
            description:'',
            estimatedTime:'',
            materialsNeeded:'',
            user:'',
        }
    }

    componentDidMount() {
        const { context, history } = this.props;
        const { id } = this.props.match.params;
        context.data.getCourse(id)
        .then(res => {

            this.setState({
                id: res.id,
                title: res.title,
                description: res.description,
                estimatedTime: res.estimatedTime,
                materialsNeeded: res.materialsNeeded,
                user: res.user,
            })
        })
        .catch( error=> {
            history.push('/notfound');
        })
    }

    deleteCourse = () => {
        const { context, match, history } = this.props;
        const { emailAddress } = context.authenticatedUser;

        // decoded password
        const decodedPassword = atob(context.authenticatedUser.password);
        const password = decodedPassword;
        const { id } = match.params;

        /**
         * 'deleteCourse' method that call the 'deleteCourse' method in Data.js
         * @param {number} courseId - course Id
         * @param {object} - emailAddress and decoded password
         */
        context.data.deleteCourse(id, { emailAddress, password })
        .then( () => {
            history.push('/');
        })
        .catch( error => {
            history.push('/error');
        })
    }
    render() {
        const { id, title, user, description, estimatedTime, materialsNeeded } = this.state;
        const { authenticatedUser } = this.props.context;

        return (
            <div>
                <div className="actions--bar">
                    <div className="bounds">
                        <div className="grid-100">
                            { authenticatedUser && authenticatedUser.id === user.id ? (
                                <span>
                                    <Link className="button" to={`/courses/${id}/update`} >Update Course</Link>
                                    <button 
                                        className="button" 
                                        type="submit" 
                                        onClick={this.deleteCourse}>
                                        Delete Course
                                    </button>
                                </span>
                            ) : null }
                            
                            <Link className="button button-secondary" to="/">Return to List</Link>
                        </div>
                    </div>
                </div>
                <div className="bounds course--detail">
                    <div className="grid-66">
                        <div className="course--header">
                            <h4 className="course--label">Course</h4>
                            <h3 className="course--title">{ title }</h3>
                            <p>{ user ? `${user.firstName} ${user.lastName}` : '' }</p>
                        </div>
                        <div className="course--description">
                            <ReactMarkdown>{ description }</ReactMarkdown>
                        </div>
                    </div>
                    <div className="grid-25 grid-right">
                        <div className="course--stats">
                            <ul className="course--stats--list">
                                <li className="course--stats--list--item">
                                    <h4>Estimated Time</h4>
                                    { estimatedTime ? (<h3>{estimatedTime}</h3>) 
                                        : (<h3>None</h3>)
                                    }
                                </li>
                                <li className="course--stats--list--item">
                                    <h4>Materials Needed</h4>
                                    <ul>
                                        <ReactMarkdown>{ materialsNeeded }</ReactMarkdown>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
