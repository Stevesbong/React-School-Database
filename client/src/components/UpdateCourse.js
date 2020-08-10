import React, { Component } from 'react';
import Form from './Form';

export default class UpdateCourse extends Component {

    state = {
        title: '',
        description: '',
        estimatedTime: '',
        materialsNeeded: '',
        user: '',
        errors: []
    }

    componentDidMount() {
        const { context, match, history } = this.props;

        /**
         * 'getCourse' method that call the 'getCourse' method in Data.js 
         * @param {number} courseId
         */
        context.data.getCourse(match.params.id)
        .then( course => {
            this.setState({
                title: course.title,
                description: course.description,
                estimatedTime: course.estimatedTime,
                materialsNeeded: course.materialsNeeded,
                user: course.user
            })
        } )
        .catch( error => {
            history.push('/notfound');
        })
    }

    componentDidUpdate() {
        const { context, history } = this.props;
        const { user } = this.state;
        const { emailAddress } = context.authenticatedUser;

        if(user) {
            if(emailAddress !== user.emailAddress) {
                history.push('/forbidden');
            }
        }
    }

    render() {
        const { title, description, estimatedTime, materialsNeeded, user, errors } = this.state;

        return (
            <div className="bounds course--detail">
                <h1>Update Course</h1>
                <div>
                    <Form 
                        cancel={ this.cancel }
                        errors={ errors }
                        submit={ this.submit }
                        submitButtonText="Update Course"
                        elements={ () => (
                            <React.Fragment>
                                <div className="grid-66">
                                    <div className="course--header">
                                        <h4 className="course--label">Course</h4>
                                        <div>
                                            <input 
                                                id="title"
                                                name="title"
                                                type="text"
                                                className="input-title course--title--input"
                                                placeholder="Course title"
                                                value={ title }
                                                onChange={ this.change }
                                            />
                                        </div>
                                        <p>By { user.firstName } { user.lastName }</p>
                                        <div className="course--description">
                                            <div>
                                                <textarea 
                                                    id="description" 
                                                    name="description" 
                                                    placeholder="Course description" 
                                                    value={ description } 
                                                    onChange={ this.change }
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="grid-25 grid-right">
                                    <div className="course--stats">
                                        <ul className="course--stats--list">
                                            <li className="course--stats--list--item">
                                                <h4>Estimated Time</h4>
                                                <div>
                                                    <input 
                                                        id="estimatedTime"
                                                        name="estimatedTime"
                                                        type="text"
                                                        className="course--time--input"
                                                        placeholder="Course Hours"
                                                        value={ estimatedTime ? estimatedTime : '' }
                                                        onChange={ this.change }
                                                    />
                                                </div>
                                            </li>
                                            <li className="course--stats--list-item">
                                                <h4>Materials Needed</h4>
                                                <div>
                                                    <textarea 
                                                        id="materialsNeeded" 
                                                        name="materialsNeeded" 
                                                        placeholder="List materials"
                                                        value={ materialsNeeded ? materialsNeeded : '' }
                                                        onChange={ this.change }
                                                    />
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </React.Fragment>
                        )}
                    />
                </div>
            </div>
        )
    }

    cancel = () => {
        const { match, history } = this.props
        history.push(`/courses/${match.params.id}`)
    }

    change = event => {
        const { name, value } = event.target;

        this.setState( () => {
            return {
                [name]: value
            }
        })
    }

    submit = () => {
        const { context, history, match } = this.props;
        const { emailAddress } = context.authenticatedUser;
        const { title, description, estimatedTime, materialsNeeded } = this.state;
        const { id } = match.params;

        // decoded password
        const decodedPassword = atob(context.authenticatedUser.password);
        const password = decodedPassword;

        const course = { id, title, description, estimatedTime, materialsNeeded };

        context.data.updateCourse(course, { emailAddress, password })
        .then( errors => {
            if(errors.length) {
                this.setState({errors:errors})
            } else {
                const detail = `/courses/${match.params.id}`
                history.push(detail)
            }
        })
        .catch( error => {
            history.push('/error')
        })
    }
}
