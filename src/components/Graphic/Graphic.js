import React from 'react';
import Chart from './UpdatebleChart';
import {getData} from "./utils"
import {TIMEFRAMES} from "./../../constants/APIURLS.js"


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
        this.newDiapazone = this.newDiapazone.bind(this);
    }

    componentDidMount() {
        const { pairId = 1, dateFrom, dateTo, take, interval, appendFake } = this.props;
        const options = {
            pairId: pairId,
            APIURL: TIMEFRAMES,
            dateFrom,
            dateTo,
            take,
            interval,
            appendFake
        };
        // console.log("options = ", options);
        getData(options).then(data => {
            // this.setState({data}, this.appendRandomData())
            this.setState({data})
        })
    }
    componentWillUnmount() {
        clearInterval(this.intervalId);
    }

    componentWillReceiveProps(nextProps) {
        const { pairId = 1, interval } = this.props;
        const { pairId: nextPairId = 1, interval: nextInterval, appendFake } = nextProps;
        // console.log("Graphic componentWillReceiveProps", nextProps);
        if ((pairId !== nextPairId) || (interval !== nextInterval)) {
            const options = {
                pairId: nextPairId,
                APIURL: TIMEFRAMES,
                dateFrom: "2018-01-01",
                dateTo: "2018-07-31",
                take: 100,
                interval: nextInterval,
                appendFake,
            };
            getData(options).then(data => {
                this.setState({data}
                // , ()=> { console.log("Chart data updated. new Id=", nextEndPoint)}
                    )
            })
        }
    }

    shouldComponentUpdate(nextProps) {
        const { pairId = 1 } = this.props;
        const { pairId: nextPairId = 1 } = nextProps;
        /*
            we preventing rendering when receiving new id of tokens pair
            and fire it when then load data for the chart
         */

        if (pairId !== nextPairId)
            {
                // console.log("Returning",nextEndPoint, !(endPoint !== nextEndPoint) );
                return !(pairId !== nextPairId)
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


     async newDiapazone({rowsToDownload, start, end, data, callback}){
        const intervalInDays = (interval, period) => {
            switch (interval) {
                case "5min" : {return Math.ceil(period * 5 / 60 / 24) }
                case "15min" : {return Math.ceil(period * 15 / 60 / 24) }
                case "30min" : {return Math.ceil(period * 30 / 60 / 24) }
                case "1hr" : {return Math.ceil(period * 60 / 60 / 24) }
                case "2hr" : {return Math.ceil(period * 120 / 60 / 24) }
                case "4hr" : {return Math.ceil(period * 240 / 60 / 24) }
                case "1day" : {return Math.ceil(period * 1)}
                default : return 1
            }
        };
        return  new Promise((resolve) => {
            const format = d3.timeFormat("%Y-%m-%d");
            const { pairId = 1, dateFrom, dateTo, take, interval, appendFake } = this.props;
            const lastBar = data[Math.min(Math.abs(start), data.length-1)];
            const offsetData = d3.timeDay.offset(lastBar.date, (-1) * intervalInDays(interval, rowsToDownload) ) ;

            // console.log(format(lastBar.date), "Offset to",offsetData, stringOffset, " on days", intervalInDays(interval, rowsToDownload));
            const stringOffset = format(offsetData); // returns a string

            const options = {
                pairId: pairId,
                APIURL: TIMEFRAMES,
                dateFrom: stringOffset,
                dateTo: format(lastBar.date),
                take,
                interval,
                appendFake
            };
            return getData(options).then(data => {
                callback(data);
                // return data
            });
        });
    }

    render() {
        if (this.state == null) {
            return <div>Loading...</div>
        }
        return (
            <Chart type="hybrid" data={this.state.data} newDiapazone={this.newDiapazone}/>
        )
    }
}

export default Graphic;

