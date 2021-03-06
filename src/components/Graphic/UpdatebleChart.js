import { format } from "d3-format";
import { timeFormat } from "d3-time-format";

import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import { ChartCanvas, Chart } from "react-stockcharts";
import {
    BarSeries,
    AreaSeries,
    CandlestickSeries,
    LineSeries,
    MACDSeries
} from "react-stockcharts/lib/series";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import {
    CrossHairCursor,
    EdgeIndicator,
    CurrentCoordinate,
    MouseCoordinateX,
    MouseCoordinateY
} from "react-stockcharts/lib/coordinates";

import { discontinuousTimeScaleProviderBuilder } from "react-stockcharts/lib/scale";
import {
    OHLCTooltip,
    MovingAverageTooltip,
    MACDTooltip
} from "react-stockcharts/lib/tooltip";
import { ema, sma, macd } from "react-stockcharts/lib/indicator";
import { fitWidth } from "react-stockcharts/lib/helper";
import { head, last } from "react-stockcharts/lib/utils";
import {chart_range} from "../../actions/ChartActions";
import * as d3 from "d3";
import {intervalInDays} from "../../utils";
// import {login_success} from "../actions/UserActions";


function getMaxUndefined(calculators) {
    return calculators
        .map(each => each.undefinedLength())
        .reduce((a, b) => Math.max(a, b));
}
const LENGTH_TO_SHOW = 180;

const macdAppearance = {
    stroke: {
        macd: "#FF0000",
        signal: "#00F300"
    },
    fill: {
        divergence: "#44d"
    }
};
const axisColor = "#EEEEEE";

class CandleStickChartPanToLoadMore extends React.Component {
    constructor(props) {
        super(props);
        const { data: inputData } = props;

        const ema26 = ema()
            .id(0)
            .options({ windowSize: 26 })
            .merge((d, c) => {
                d.ema26 = c;
            })
            .accessor(d => d.ema26);

        const ema12 = ema()
            .id(1)
            .options({ windowSize: 12 })
            .merge((d, c) => {
                d.ema12 = c;
            })
            .accessor(d => d.ema12);

        const macdCalculator = macd()
            .options({
                fast: 12,
                slow: 26,
                signal: 9
            })
            .merge((d, c) => {
                d.macd = c;
            })
            .accessor(d => d.macd);

        const smaVolume50 = sma()
            .id(3)
            .options({
                windowSize: 50,
                sourcePath: "volume"
            })
            .merge((d, c) => {
                d.smaVolume50 = c;
            })
            .accessor(d => d.smaVolume50);

        const maxWindowSize = getMaxUndefined([
            ema26,
            ema12,
            macdCalculator,
            smaVolume50
        ]);
        /* SERVER - START */
        // const dataToCalculate = inputData.slice(-LENGTH_TO_SHOW - maxWindowSize);
        // const dataToCalculate = inputData.slice( - maxWindowSize);
        const dataToCalculate = inputData;

        const calculatedData = ema26(
            ema12(macdCalculator(smaVolume50(dataToCalculate)))
        );
        const indexCalculator = discontinuousTimeScaleProviderBuilder()
            // .initialIndex(initialIndex)
            .indexCalculator();

        const { index } = indexCalculator(calculatedData);

        /* SERVER - END */
        // console.log(inputData.length, dataToCalculate.length, maxWindowSize, index);

        const xScaleProvider = discontinuousTimeScaleProviderBuilder().withIndex(
            index
        );
        const {
            data: linearData,
            xScale,
            xAccessor,
            displayXAccessor
        } = xScaleProvider(calculatedData);
        // } = xScaleProvider(calculatedData.slice(-LENGTH_TO_SHOW));

        // console.log(head(linearData), last(linearData))
        // console.log(linearData.length);

        this.state = {
            ema26,
            ema12,
            macdCalculator,
            smaVolume50,
            linearData,
            data: linearData,
            xScale,
            xAccessor,
            displayXAccessor,
            initialIndex: 0
        };
        this.chartData = linearData;
        this.handleDownloadMore = this.handleDownloadMore.bind(this);
    }

    saveCanvas = node => {
        this.canvas = node;
    };
    append = newData => {
        // const { data: inputData } = newData;
        const {
            ema26,
            ema12,
            macdCalculator,
            smaVolume50,
            initialIndex
        } = this.state;

        const maxWindowSize = getMaxUndefined([
            ema26,
            ema12,
            macdCalculator,
            smaVolume50
        ]);
        /* SERVER - START */
        /*****************************************************************
         * Merging arrays taking into account date
         * it works well
         *****************************************************************/
            const dataToCalculate = newData;
        // const dataToCalculate = [...this.chartData].reduce((a, b) => {
        // const dataToCalculate = [...this.chartData].reduce((a, b) => {
        //     const match = newData.filter(({ date }) => date.getTime() === b.date.getTime());
        //     if(match) {
        //         a.push(Object.assign(b, match));
        //     } else {
        //         a.push(b);
        //     }
        //
        //     return a;
        // }, []);
        /****************************************************************
        /****************************************************************/
        // console.log("newData =====> ", newData,  head(newData), last(newData));
        // console.log("dataToCalculate =====> ", dataToCalculate,  head(dataToCalculate), last(dataToCalculate));

        const calculatedData = ema26(
            ema12(macdCalculator(smaVolume50(dataToCalculate)))
        );
        const indexCalculator = discontinuousTimeScaleProviderBuilder()
            .initialIndex(initialIndex)
            .indexCalculator();

        // console.log(inputData.length, dataToCalculate.length, maxWindowSize)
        const { index } = indexCalculator(calculatedData);
        /* SERVER - END */

        const xScaleProvider = discontinuousTimeScaleProviderBuilder()
            .initialIndex(initialIndex)
            .withIndex(index);
        const {
            data: linearData,
            xScale,
            xAccessor,
            displayXAccessor
        } = xScaleProvider(calculatedData);
        // } = xScaleProvider(calculatedData.slice(-this.canvas.fullData.length));

        // console.log("linearData = ", head(linearData), last(linearData));
        this.setState({
            ema26,
            ema12,
            macdCalculator,
            smaVolume50,
            linearData,
            data: linearData,
            xScale,
            xAccessor,
            displayXAccessor
        });
    };
    componentWillReceiveProps(nextProps) {
        // console.log("===nextProps.data===", nextProps.data, nextProps);
        this.append(nextProps.data);
        return true;
    }

    async handleDownloadMore(start, end) {
        if (Math.ceil(start) === end) return;
        const {
            data: prevData,
            ema26,
            ema12,
            macdCalculator,
            smaVolume50
        } = this.state;
        const { data: inputData, newDiapazone } = this.props;

        const rowsToDownload = end - Math.ceil(start);

        await newDiapazone({
            rowsToDownload, start: Math.ceil(start), end, data: this.state.data,
            callback: newData => {

                const currentDate = new Date();
                const {dateFrom, dateTo} = this.props.chartRange;

                // console.log(currentDate, dateFrom, dateTo, this.props);
                console.log(currentDate, new Date(dateFrom), new Date(dateTo), this.props);
                const format = d3.timeFormat("%Y-%m-%d");
                // const currentDatePlusOdin = d3.timeDay.offset(new Date(dateTo), intervalInDays(this.state.interval, 1) ) ;
                const offsetData = d3.timeDay.offset(new Date(dateFrom), (-1) * intervalInDays(this.state.interval, rowsToDownload) ) ;

                // console.log("dateFrom =",  format(offsetData), "dateTo =", dateFrom);
                // console.log("rowsToDownload =",  rowsToDownload, "intervalInDays =", (-1) * intervalInDays(this.state.interval, rowsToDownload));

                // this.props.chart_range({
                //     start: Math.ceil(start),
                //     end,
                //     dateFrom: format(offsetData),
                //     dateTo: dateFrom,
                //
                // }); //save to redux store

                // const dataToCalculate = inputData.concat(newData);
                const dataToCalculate = [...newData, ...inputData];

                const calculatedData = ema26(
                    ema12(macdCalculator(smaVolume50(dataToCalculate)))
                );
                const indexCalculator = discontinuousTimeScaleProviderBuilder()
                    .initialIndex(Math.ceil(start))
                    .indexCalculator();
                const { index } = indexCalculator(
                    calculatedData
                    // calculatedData.slice(-rowsToDownload).concat(prevData)
                );
                // console.log(index, " |||| right data dataToCalculate =", dataToCalculate);
                const xScaleProvider = discontinuousTimeScaleProviderBuilder()
                    .initialIndex(Math.ceil(start))
                    .withIndex(index);

                const {
                    data: linearData,
                    xScale,
                    xAccessor,
                    displayXAccessor
                } = xScaleProvider(calculatedData);
                // } = xScaleProvider(calculatedData.slice(-rowsToDownload).concat(prevData));

                    this.setState({
                        data: linearData,
                        xScale,
                        xAccessor,
                        displayXAccessor,
                        initialIndex: Math.ceil(start)
                    });
            }
        });
    }

    render() {
        const { type, width, ratio } = this.props;
        const {
            data,
            ema26,
            ema12,
            macdCalculator,
            smaVolume50,
            xScale,
            xAccessor,
            displayXAccessor
        } = this.state;
/*
Zoom and Pan description
http://rrag.github.io/react-stockcharts/documentation.html#/zoom_and_pan
*/
// console.log("render UPDATEBLECHART data =", head(data), data);

        /**
         * clamp prevents scrolling past the last data point, and is disabled by default.
         * Supported values for clamp are left, right, or both for clamping one or both sides of the graph.
        **/

        return (
            <ChartCanvas
                ratio={ratio}
                width={width}
                height={600}
                margin={{ left: 70, right: 70, top: 20, bottom: 30 }}
                type={type}
                seriesName="MSFT"
                data={data}
                xScale={xScale}
                xAccessor={xAccessor}
                displayXAccessor={displayXAccessor}
                ref={node => {
                    this.saveCanvas(node);
                }}
                xExtents={[xAccessor(data[data.length - 50]), xAccessor(last(data))]}
                zoomEvent={true}
                clamp={"both"}
                onLoadMore={this.handleDownloadMore}
            >
                <Chart
                    id={1}
                    height={400}
                    yExtents={[d => [d.high, d.low], ema26.accessor(), ema12.accessor()]}
                    padding={{ top: 10, bottom: 20 }}
                >
                    <XAxis
                        axisAt="bottom"
                        orient="bottom"
                        showTicks={false}
                        outerTickSize={0}
                    />
                    {/*<YAxis axisAt="right" orient="right" ticks={5} />*/}
                    <XAxis axisAt="bottom" orient="bottom" showTicks={false} tickStroke={axisColor} outerTickSize={0} stroke={axisColor}/>
                    <YAxis axisAt="right" orient="right" ticks={2} tickStroke={axisColor} />

                    <MouseCoordinateY
                        at="right"
                        orient="right"
                        displayFormat={format(".2f")}
                    />

                    <CandlestickSeries
                        stroke={d => d.close > d.open ? "#69FF83" : "#FF0000"}
                        wickStroke={d => d.close > d.open ? "#6BA583" : "#DB0000"}
                        fill={d => d.close > d.open ? "#6BA583" : "#DB0000"}/>
                    <LineSeries yAccessor={ema26.accessor()} stroke={ema26.stroke()} />
                    <LineSeries yAccessor={ema12.accessor()} stroke={ema12.stroke()} />

                    <CurrentCoordinate
                        yAccessor={ema26.accessor()}
                        fill={ema26.stroke()}
                    />
                    <CurrentCoordinate
                        yAccessor={ema12.accessor()}
                        fill={ema12.stroke()}
                    />

                    {/*<EdgeIndicator*/}
                        {/*itemType="last"*/}
                        {/*orient="right"*/}
                        {/*edgeAt="right"*/}
                        {/*yAccessor={d => d.close}*/}
                        {/*fill={d => (d.close > d.open ? "#6BA583" : "#FF0000")}*/}
                    {/*/>*/}

                    <OHLCTooltip origin={[-40, 0]} />
                    <MovingAverageTooltip
                        onClick={e => console.log(e)}
                        origin={[-38, 15]}
                        options={[
                            {
                                yAccessor: ema26.accessor(),
                                type: ema26.type(),
                                stroke: ema26.stroke(),
                                ...ema26.options()
                            },
                            {
                                yAccessor: ema12.accessor(),
                                type: ema12.type(),
                                stroke: ema12.stroke(),
                                ...ema12.options()
                            }
                        ]}
                    />
                </Chart>
                <Chart
                    id={2}
                    height={150}
                    yExtents={[d => d.volume, smaVolume50.accessor()]}
                    origin={(w, h) => [0, h - 300]}
                >
                    <YAxis
                        axisAt="left"
                        orient="left"
                        ticks={5}
                        tickFormat={format(".2s")}
                    />

                    {/*<MouseCoordinateY*/}
                        {/*at="left"*/}
                        {/*orient="left"*/}
                        {/*displayFormat={format(".4s")}*/}
                    {/*/>*/}

                    <BarSeries
                        yAccessor={d => d.volume}
                        fill={d => (d.close > d.open ? "#6BA583" : "#FF0000")}
                    />
                    <AreaSeries
                        yAccessor={smaVolume50.accessor()}
                        stroke={smaVolume50.stroke()}
                        fill={smaVolume50.fill()}
                    />
                </Chart>
                <Chart
                    id={3}
                    height={150}
                    yExtents={macdCalculator.accessor()}
                    origin={(w, h) => [0, h - 150]}
                    padding={{ top: 10, bottom: 10 }}
                >
                    <XAxis axisAt="bottom" orient="bottom" showTicks={true} tickStroke={axisColor} outerTickSize={0} stroke={axisColor}/>
                    <YAxis axisAt="right" orient="right" ticks={2} tickStroke={axisColor}/>

                    <MouseCoordinateX
                        at="bottom"
                        orient="bottom"
                        displayFormat={timeFormat("%Y-%m-%d")}/>
                    <MouseCoordinateY
                        at="right"
                        orient="right"
                        displayFormat={format(".2f")}/>

                    <MACDSeries yAccessor={d => d.macd} {...macdAppearance} />
                    <MACDTooltip
                        origin={[-38, 15]}
                        yAccessor={d => d.macd}
                        options={macdCalculator.options()}
                        appearance={macdAppearance}
                    />
                </Chart>
                <CrossHairCursor stroke={axisColor}/>
            </ChartCanvas>
        );
    }
}

CandleStickChartPanToLoadMore.propTypes = {
    data: PropTypes.array.isRequired,
    width: PropTypes.number.isRequired,
    ratio: PropTypes.number.isRequired,
    type: PropTypes.oneOf(["svg", "hybrid"]).isRequired
};

CandleStickChartPanToLoadMore.defaultProps = {
    type: "svg"
};

CandleStickChartPanToLoadMore = fitWidth(CandleStickChartPanToLoadMore);

const mapStateToProps = state => ({
    ...state
});

const mapDispatchToProps = dispatch => ({
    chart_range: (newRange) => { dispatch(chart_range(newRange)); } //set "dateFrom" and "dateTo"
});

export default connect(mapStateToProps, mapDispatchToProps)(CandleStickChartPanToLoadMore);

