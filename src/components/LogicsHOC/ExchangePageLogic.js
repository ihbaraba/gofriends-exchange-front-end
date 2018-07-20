import React from 'react';
import initialState from "./../../store/initialState";


const translateProps = (props) => {

    console.log("translateProps", this.props);

    const newProps = {...props, state: initialState};
    return newProps;
}


export default (WrappedComponent) => {
    return function wrappedRender(args) {
        return WrappedComponent(translateProps(args));
    }
}