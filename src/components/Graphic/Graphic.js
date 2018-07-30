import React from 'react';
// import Chart from './UpdatebleChart';
import Chart from './Chart';
import {getData} from "./utils"
import * as d3 from "d3";

class Graphic extends React.Component {
    constructor(props) {
        super(props);
        this.simulationInterval = 1000;
        this.simulationDuration = 20;
        this.dataIndex = 0;
        this.simulationEnd = d3.timeMinute.offset(
            new Date(),
            this.simulationDuration
        );
    }

    componentDidMount() {
        const { endPoint = 1 } = this.props;
        getData(endPoint).then(data => {
            // this.setState({data}, this.appendRandomData())
            this.setState({data})
        })
    }
    componentWillUnmount() {
        clearInterval(this.intervalId);
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

    /* Just to simulate getting data from the server */
    /* append as new candles */
    appendRandomData = () => {
        this.intervalId = setInterval(() => {
            const { data } = this.state;
            const lastBar = data[data.length - 1];
            let dataPoint;
            if (this.dataIndex < data.length) {
                const newBar = data[this.dataIndex];
                dataPoint = {
                    ...newBar
                };
                this.dataIndex++;
            } else {
                const newBar = data[0];
                dataPoint = {
                    ...newBar
                };
                this.dataIndex = 0;
            }
            dataPoint.date = d3.timeDay.offset(lastBar.date, 1);
            data.push(dataPoint);
            this.setState({ data });
            if (new Date() > this.simulationEnd) {
                clearInterval(this.intervalId);
            }
        }, this.simulationInterval);
    };

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

