import React, {Component} from 'react';
import {connect} from "react-redux";
import Chart from './UpdatebleChart';
import {getData, getDataFromSocket} from "./utils"
import {intervalInDays} from "./../../utils"
import {TIMEFRAMES} from "./../../constants/APIURLS.js"
import io from 'socket.io-client';
import {SOCKET_SOURCE, QUOTATIONS} from "./../../constants/APIURLS.js"

import * as d3 from "d3";
import {timeParse} from "d3-time-format";
import CandleStickChart from './NewChart';

function parseData(parse) {
    return function (d) {
        d.date = parse(d.date);
        d.open = +d.open;
        d.high = +d.high;
        d.low = +d.low;
        d.close = +d.close;
        d.volume = +d.volume;

        return d;
    };
}

const parseDate = timeParse("%Y-%m-%dT%H:%M:%S.%LZ");

class Graphic extends Component {
    constructor(props) {
        super(props);
        this.socket = io(SOCKET_SOURCE);
        this.chartData = []; //mirror of state
        this.simulationInterval = 1000;
        this.simulationDuration = 20;
        this.dataIndex = 0;
        this.simulationEnd = d3.timeMinute.offset(
            new Date(),
            this.simulationDuration
        );
        this.state = {
            newCandle: {}
        }
        this.newDiapazone = this.newDiapazone.bind(this);
        this.intervalInMiliseconds = this.intervalInMiliseconds.bind(this);
        this.updatedLastCandleFromSocket = this.updatedLastCandleFromSocket.bind(this);
        this.saveTheLastCandleAndCreateNewOne = this.saveTheLastCandleAndCreateNewOne.bind(this);
        // this.updatedDateFromSocket = this.updatedDateFromSocket.bind(this);
    }

    componentWillUnmount() {
        clearInterval(this.intervalId);
    }

    componentWillReceiveProps(nextProps) {
        const {pairId = 1, interval, dateFrom, dateTo} = this.props;
        const {
            pairId: nextPairId = 1,
            interval: nextInterval, appendFake,
            chartRange: {dateFrom: nextdateFrom = "2018-08-27", dateTo: nextdateTo = "2018-09-01"}
        } = nextProps;
        const candlesToDownload = 200; // Avoid lag of data loading
        const offsetData = d3.timeDay.offset(new Date(dateTo), (-1) * intervalInDays(nextInterval, candlesToDownload));
        const format = d3.timeFormat("%Y-%m-%d");
        const stringOffset = format(offsetData); // returns a string

        if ((pairId !== nextPairId) || (interval !== nextInterval) || (dateFrom !== nextdateFrom) || (dateTo !== nextdateTo)) {
            const options = {
                pairId: nextPairId,
                APIURL: TIMEFRAMES,
                dateFrom: stringOffset,
                dateTo,
                take: 100,
                interval: nextInterval,
                appendFake,
            };

            getData(options).then(data => {
                if (data.length === 0) {
                    this.chartData = data;
                    this.setState({data});
                }
                else {
                    this.chartData = data;
                    this.setState({data}
                    )
                }
            })
        }
    }

    shouldComponentUpdate(nextProps) {
        const {pairId = 1} = this.props;
        const {pairId: nextPairId = 1} = nextProps;
        /*
            we preventing rendering when receiving new id of tokens pair
            and fire it when then load data for the chart
         */

        if (pairId !== nextPairId) {
            // console.log("Returning",nextEndPoint, !(endPoint !== nextEndPoint) );
            return !(pairId !== nextPairId)
        }
        else {
            // console.log("Returning",nextEndPoint, true );
            return true
        }
    }

    intervalInMiliseconds = (interval, period) => {
        const MsInMin = 60 * 1000;
        switch (interval) {
            case "5min" : {
                return Math.ceil(period * 5 * MsInMin)
            }
            case "15min" : {
                return Math.ceil(period * 15 * MsInMin)
            }
            case "30min" : {
                return Math.ceil(period * 30 * MsInMin)
            }
            case "1hr" : {
                return Math.ceil(period * 60 * MsInMin)
            }
            case "2hr" : {
                return Math.ceil(period * 120 * MsInMin)
            }
            case "4hr" : {
                return Math.ceil(period * 240 * MsInMin)
            }
            case "1day" : {
                return Math.ceil(period * 1440 * MsInMin)
            }
            default :
                return MsInMin
        }
    };

    updatedLastCandleFromSocket(bid) {
        const parsedBid = parseData(parseDate)(bid);
        // console.log("updatedLastCandleFromSocket bid = , ", bid, " ===> ", parsedBid);
        const {data} = this.state;
        // const lastBar = data[data.length - 1];
        // data[data.length - 1] = {...data[data.length - 1], ...bid};
        data[data.length - 1] = {...data[data.length - 1], ...parsedBid};
        // console.log("last ", data.length, data[data.length - 1], " data =", data);
        this.chartData = data;
        this.setState({data}
            // , () => { console.log(lastBar,"updatedLastCandleFromSocket ", bid, data[data.length - 1] ); }
        );
        // this.forceUpdate();
    }

    saveTheLastCandleAndCreateNewOne(bid) {
        /* fixing the last candle */
        const {data} = this.state;
        // console.log("saveTheLastCandleAndCreateNewOne  this.state = ", this.state);
        const {interval,} = this.props;

        const parsedBid = parseData(parseDate)(bid);

        data[data.length - 1] = {...data[data.length - 1], ...parsedBid};

        /* open a new candle witch will be updated by this.updatedLastCandleFromSocket function */
        setInterval(() => {
            const newFrame = {...bid, date: d3.timeMinute.offset(bid.date, 5)};
            data.push(newFrame);
            this.chartData = data;
            this.setState({data});
        }, this.intervalInMiliseconds(interval, 1));
    }

    async newDiapazone({rowsToDownload, start, end, data, callback}) {

        // console.log("START =", start, "END = ", end, data.length, data);
        return new Promise(() => {
            const format = d3.timeFormat("%Y-%m-%d");
            const {pairId = 1, take, interval, appendFake} = this.props;
            // const lastBarIndex = Math.min(Math.abs(end), data.length-1);
            const lastBarIndex = 0;
            const lastBar = data[lastBarIndex];
            // const lastBar = data[Math.min(Math.abs(start), data.length-1)];

            const candlesToDownload = (rowsToDownload < 600) ? rowsToDownload : 600; // Avoid lag of data loading

            const offsetData = d3.timeDay.offset(lastBar.date, (-1) * intervalInDays(interval, candlesToDownload));

            // console.log("From, ", format(lastBar.date), "lastBarIndex = ", lastBarIndex, "Offset to",offsetData, " on days", intervalInDays(interval, rowsToDownload));
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
            // console.log("options = ", options);

            return getData(options).then(data => {
                // console.log("getData data ====> ", data);
                callback(data);
                // return data
            });
        });
    }

    getDataFromSocket = (id) => {
        this.socket.on('timeframe_updated_' + id, (bid) => {
            this.setState({
                newCandle: bid
            });
        });
    };

    async componentDidMount() {
        const {pairId = 1, dateFrom, dateTo, take, interval, appendFake} = this.props;
        const options = {
            pairId: pairId,
            APIURL: TIMEFRAMES,
            dateFrom,
            dateTo,
            take,
            interval,
            appendFake
        };

        let data = await getData(options);
        this.chartData = data;
        this.setState({data});
        // this.getDataFromSocket(this.props.pairId);
    }


    componentWillUnmount() {
        this.socket.close();
    }

    render() {
        // if (this.state == null) {
        //     return <div>Loading...</div>
        // }

        return (
            <CandleStickChart
                type="hybrid"
                interval={this.props.interval}
                data={this.chartData}
                newCandle={this.state.newCandle}
                newDiapazone={this.newDiapazone}
            />
        )
    }
}

const mapStateToProps = state => ({
    ...state
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Graphic);

