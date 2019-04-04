import React, {Component} from 'react';
import Chart from "react-apexcharts";

class CandleStickChart extends Component {
    render() {
        const {data, newCandle} = this.props;

        const chartData = data.map(item => ({
            x: new Date(item.date),
            y: [item.open, item.high, item.low, item.close]
        }));

        const params = {
            seriesCandle: [{
                data: chartData
            }],
            seriesBar: [{
                name: 'volume',
                data: chartData
            }],
            chartOptionsCandlestick: {
                chart: {
                    id: 'candles',
                    toolbar: {
                        autoSelected: 'pan',
                        show: false
                    },
                    zoom: {
                        enabled: false
                    },
                },
                plotOptions: {
                    candlestick: {
                        colors: {
                            upward: '#00CE7D',
                            downward: '#E55541'
                        }
                    }
                },
                xaxis: {
                    type: 'datetime',
                    axisBorder: {
                        offsetX: 0
                    }
                },
            },

            chartOptionsBar: {
                chart: {
                    type: 'bar',
                    brush: {
                        enabled: true,
                        target: 'candles'
                    },
                    selection: {
                        enabled: true,
                        xaxis: {
                            min: ((new Date().getTime()) - 500000000),
                            max: (new Date().getTime()) - 80000000
                        },
                        fill: {
                            color: '#ccc',
                            opacity: 0.4
                        },
                        stroke: {
                            color: '#0D47A1',
                        }
                    },
                },
                dataLabels: {
                    enabled: false
                },
                plotOptions: {
                    bar: {
                        columnWidth: '80%',
                        colors: {
                            ranges: [{
                                from: -1000,
                                to: 0,
                                color: '#242B3A'
                            }, {
                                from: 1,
                                to: 10000,
                                color: '#242B3A'
                            }],

                        },
                    }
                },
                stroke: {
                    width: 0
                },
                xaxis: {
                    type: 'datetime',
                },
                yaxis: {
                    tooltip: {
                        enabled: true
                    }
                }
            },
        };

        return (
            <div id="chart-box">
                <div id="chart-candlestick">
                    <Chart
                        options={params.chartOptionsCandlestick}
                        series={params.seriesCandle}
                        type="candlestick"
                        height="400"
                    />

                </div>
                <div id="chart-bar">
                    <Chart
                        options={params.chartOptionsBar}
                        series={params.seriesBar}
                        type="bar"
                        height="160"
                    />
                </div>
            </div>
        );
    }
}

export default CandleStickChart;