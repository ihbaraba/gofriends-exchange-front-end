import React, {Component} from 'react';

import FilterBlock from "../components/FilterBlock";
import CommissionsProfitList from './CommissionsProfitList'
import NavLink from '../../components/NavLink';
import {changeSubPage} from "../../actions/AdminActions";
import {connect} from "react-redux";

class Commissions extends Component {

    goSettingsPage= () => {
        this.props.changeSubPage({title: 'Changes'})
    };

    render() {
        return (
            <div className='commissions-page'>
                <div className='admin-btn green-btn go-settings-btn' onClick={this.goSettingsPage}>
                    <NavLink to='/admin/commissions/settings'>
                        <i className="fa fa-sliders" aria-hidden="true"></i>
                        Change
                    </NavLink>
                </div>
                <FilterBlock/>

                <CommissionsProfitList/>
            </div>
        )
    }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
    changeSubPage: (page) => dispatch(changeSubPage(page)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Commissions);