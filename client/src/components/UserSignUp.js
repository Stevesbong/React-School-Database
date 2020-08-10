import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';

export default class UserSignUp extends Component {
    state = {
        firstName: '',
        lastName: '',
        emailAddress: '',
        password: '',
        confirmPassword: '',
        errors: []
    }
    render() {
        const { firstName, lastName, emailAddress, password, confirmPassword, errors } = this.state;

        return (
            <div className="bounds">
                <div className="grid-33 centered signin">
                    <h1>Sign Up</h1>
                    <div>
                        <Form 
                            cancel={ this.cancel }
                            errors={ errors }
                            submit={ this.submit }
                            submitButtonText="Sign Up"
                            elements={ () => (
                                <React.Fragment>
                                    <input 
                                        id="firstName"
                                        name="firstName"
                                        type="text"
                                        value={ firstName }
                                        onChange={ this.change }
                                        placeholder="First Name"
                                    />
                                    <input 
                                        id="lastName"
                                        name="lastName"
                                        type="text"
                                        value={ lastName }
                                        onChange={ this.change }
                                        placeholder="Last Name"
                                    />
                                    <input 
                                        id="emailAddress"
                                        name="emailAddress"
                                        type="text"
                                        value={ emailAddress }
                                        onChange={ this.change }
                                        placeholder="Email Address"
                                    />
                                    <input 
                                        id="password" 
                                        name="password"
                                        type="password"
                                        value={ password } 
                                        onChange={ this.change } 
                                        placeholder="Password" 
                                    />
                                    <input 
                                        id="confirmPassword" 
                                        name="confirmPassword"
                                        type="password"
                                        value={ confirmPassword } 
                                        onChange={ this.change } 
                                        placeholder="Confirm Password"
                                    />
                                </React.Fragment>
                            )}
                        />
                    </div>
                    <p>&nbsp;</p>
                    <p>Already have a user account? <Link to=''>Click here</Link> to sign in!</p>
                </div>
            </div>
        )
    }

    cancel = () => {
        this.props.history.push('/')
    }

    change = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        this.setState( () => {
            return {
                [name]: value
            }
        })
    }

    submit = () => {
        const { context, history } = this.props;
        const { firstName, lastName, emailAddress, password, confirmPassword } = this.state;
        const user = { firstName, lastName, emailAddress, password };
        if(password === confirmPassword) {

            /**
             * 'createUser' method that call the 'createUser' method in Data.js 
             * @param {object} user user information
             */
            context.data.createUser(user)
            .then( errors => {
                if (errors.length){
                    this.setState({ errors:errors });
                } else {
                    context.actions.signIn(emailAddress, password)
                    .then( () => {
                        this.props.history.push('/')
                    })
                }
            })
            .catch( error => {
                history.push('/error');
            })
        } else {
            this.setState({errors:['password does not match.']});
        }
    }
}
