import React, { Component } from 'react'
import Data from '../Data';
import Form from './Form';

export default class CreateCourse extends Component {

    constructor() {
        super();
        this.data = new Data();
    }

    state = {
        title: '',
        description: '',
        estimatedTime: '',
        materialsNeeded: '',
        userId: '',
        name: '',
        errors: []
    }

    componentDidMount() {
        const { context } = this.props;
        const { firstName, lastName } = context.authenticatedUser;
        this.setState( ()=> {
            return {
                userId: context.authenticatedUser.id,
                name: `${firstName} ${lastName}`
            }
        })
    }
    render() {
        const { title, description, estimatedTime, materialsNeeded } = this.state;
        return (
            <div className="bounds course--detail">
                <h1>Create Course</h1>
                <Form 
                    cancel={this.cancel}
                    change={this.change}
                    submit={this.submit}
                    submitButtonText = "Create Course"
                    elements={ ()=> (
                        <React.Fragment>
                            <div className="grid-66">
                                <div className="course--header">
                                    <h4 className="course--label">Course</h4>
                                    <div>
                                        <input
                                            id="title" 
                                            name="title" 
                                            type="text" 
                                            value={title}
                                            onChange={this.change} 
                                            className="input-title course--title--input" 
                                            placeholder="Course title"
                                        />
                                        <p>By {this.state.name}</p>
                                    </div>
                                </div>
                                <div className="course--description">
                                    <div>
                                        <textarea 
                                            id="description"
                                            name="description"
                                            value={description}
                                            onChange={this.change}
                                            placeholder="Course description"
                                        />
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
                                                    value={estimatedTime}
                                                    onChange={this.change}
                                                    className="course--time--input"
                                                    placeholder="Course Hours"
                                                />
                                            </div>
                                        </li>
                                        <li className="course--stats--list--item">
                                            <h4>Materials Needed</h4>
                                            <div>
                                                <textarea 
                                                    id="materialsNeeded"
                                                    name="materialsNeeded"
                                                    value={materialsNeeded}
                                                    onChange={this.change}
                                                    placeholder="List materials"
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
        )
    }

    cancel = () => {
        this.props.history.push('/')
    }

    change = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        this.setState( ()=> {
            return {
                [name]: value
            }
        })
    }

    submit = () => {
        const { context } = this.props;
        // console.log(context.authenticatedUser,'hji')
        const { emailAddress } = context.authenticatedUser;
        const { title, description, estimatedTime, materialsNeeded, userId } = this.state;
        const decodedPassword = atob(context.authenticatedUser.password)
        const password = decodedPassword;

        const course = { title, description, estimatedTime, materialsNeeded, userId };

        context.data.createCourse(course, {emailAddress, password})
        .then( errors => {
            if(errors) {
                this.setState({errors: errors.error})
            } else {
                this.props.history.push('/')
            }
        })
    }
}
