import React, { Component } from 'react';
import Cookies from 'js-cookie';
import Data from './Data';

const Context = React.createContext();

export class Provider extends Component {

    state = {
        authenticatedUser: Cookies.getJSON('authenticatedUser') || null
    }

    constructor() {
        super();
        this.data = new Data();
    }

    render() {
        const { authenticatedUser } = this.state;

        const value = {
            authenticatedUser,
            data: this.data,
            actions: {
                signIn: this.signIn,
                signOut: this.signOut
            }
        }
        return (
            <Context.Provider value={ value }>
                { this.props.children }
            </Context.Provider>
        )
    }

    /**
     * 'signIn' method perform a async operation that call the 'getUser' method in Data.js
     * @param {string} username -emailAddress
     * @param {string} password 
     */
    signIn = async ( username, password ) => {
        const user = await this.data.getUser(username, password);
        if(user !== null) {
            const encodePass = btoa(password);
            user.password = encodePass;
            this.setState( () => {
                return {
                    authenticatedUser: user,
                }
            })
            Cookies.set('authenticatedUser', JSON.stringify(user), { expires: 1 });
        }
        return user;
    }

    /**
     * 'signOut' method perform a singing out the current user
     * authenticatedUser in state to null and remove cookie.
     */
    signOut = () => {
        this.setState( () => {
            return {
                authenticatedUser: null,
            }
        })
        Cookies.remove('authenticatedUser');
    }
}

export const Consumer = Context.Consumer;

/**
 * A Higher-Order Component that wraps react component in a Consumer component.
 * @param {class} Component - React Component
 */
export default function withContext(Component) {
    return function ContextComponent(props) {
        return (
            <Context.Consumer>
                { context => <Component { ...props } context={ context } /> }
            </Context.Consumer>
        )
    }
}