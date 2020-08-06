import React, { Component } from 'react';
// import Cookies from 'js-cookie';
import Data from './Data';

const Context = React.createContext();

export class Provider extends Component {

    state = {

    }

    constructor() {
        super();
        this.data = new Data();
    }

    render() {

        const value = {
            data: this.data
        }
        return (
            <Context.Provider value={value}>
                { this.props.children }
            </Context.Provider>
        )
    }
}

export const Consumer = Context.Consumer;

export default function withContext(Component) {
    return function ContextComponent(props) {
        return (
            <Context.Consumer>
                { context => <Component { ...props } context={ context } /> }
            </Context.Consumer>
        )
    }
}