import React from 'react';
import Chart from './Chart';
import {getData} from "./utils"

class Graphic extends React.Component {
    componentDidMount() {
        const { endPoint = 1 } = this.props;
        getData(endPoint).then(data => {
            this.setState({data})
        })
    }
    componentWillReceiveProps(nextProps) {
        const { endPoint = 1 } = this.props;
        const { endPoint: nextEndPoint = 1 } = nextProps;
        if (endPoint !== nextEndPoint) {
            // console.log("Graphic componentWillReceiveProps", nextProps);
            getData(endPoint).then(data => {
                this.setState({data}
                // , ()=> { console.log("Chart data updated. new Id=", nextEndPoint)}
                    )
            })
        }
    }

    shouldComponentUpdate(nextProps) {
        const { endPoint = 1 } = this.props;
        const { endPoint: nextEndPoint = 1 } = nextProps;
        /*
            we preventing rendering when receiving new id of tokens pair
            and fire it when then load data for the chart
         */

        if (endPoint !== nextEndPoint)
            {
                // console.log("Returning",nextEndPoint, !(endPoint !== nextEndPoint) );
                return !(endPoint !== nextEndPoint)
            }
            else {
                // console.log("Returning",nextEndPoint, true );
                return true
            }
    }

    render() {
        if (this.state == null) {
            return <div>Loading...</div>
        }
        return (
            <Chart type="hybrid" data={this.state.data}/>
        )
    }
}

export default Graphic;

