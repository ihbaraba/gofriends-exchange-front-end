import React from 'react';
import initialState from "./../../store/initialState";


export default function () {

    console.log("translateProps", this.props);

    const newProps = {...props, state: initialState};
    return newProps;
}


