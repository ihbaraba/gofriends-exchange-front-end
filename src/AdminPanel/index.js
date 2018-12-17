import React, {Component} from 'react';
import NavBar from './components/NavBar';

import '../styles/adminPanel.css';

class Index extends Component {

    componentDidMount() {
        document.getElementById('root').classList.add('admin-version')
    }

    render() {
        const {children} = this.props;

        return (
            <div className='admin-panel'>
                <NavBar />

                <div className='admin-content'>
                    {children}
                </div>
            </div>
        )
    }
}

export default Index;