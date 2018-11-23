import React, { Fragment } from 'react';
import Header from './Header';

const NotFound = () => (
    <Fragment>
        <Header />

        <div className="notfound">
            <h3>404 page not found</h3>
            <p>We are sorry but the page you are looking for does not exist.</p>
        </div>
    </Fragment>

);
export default NotFound;
