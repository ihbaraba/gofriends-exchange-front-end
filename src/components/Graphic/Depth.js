import React from "react";
import PropTypes from "prop-types";

import { scaleLinear } from "d3-scale";

import { timeParse } from "d3-time-format";
// import { tsv } from "d3-request";
import { scaleTime } from "d3-scale";



import {format} from "d3-format";
import {timeFormat} from "d3-time-format";

import {ChartCanvas, Chart} from "react-stockcharts";
import {
    BarSeries,
    OHLCSeries,
    LineSeries,
    MACDSeries,
    CandlestickSeries,
    AreaSeries,
} from "react-stockcharts/lib/series";
import {XAxis, YAxis} from "react-stockcharts/lib/axes";
import {
    CrossHairCursor,
    EdgeIndicator,
    MouseCoordinateX,
    MouseCoordinateY,
} from "react-stockcharts/lib/coordinates";

import {discontinuousTimeScaleProvider} from "react-stockcharts/lib/scale";
import {
    OHLCTooltip,
    MovingAverageTooltip,
    MACDTooltip,
    HoverTooltip,
    tooltipContent,
} from "react-stockcharts/lib/tooltip";
import {ema, macd, change, elderImpulse} from "react-stockcharts/lib/indicator";
import {fitDimensions} from "react-stockcharts/lib/helper";
import {fitWidth} from "react-stockcharts/lib/helper";
import {last} from "react-stockcharts/lib/utils";

class DepthChart extends React.Component {
    render() {
        const {
            axisColor,
            // data,
            height,
            type,
            margin,
            width,
            ratio,
            sell,
            buy,
        } = this.props;

        console.log("sell =", sell, " buy =", buy);


        const parseDate = timeParse("%Y-%m-%d");
        // const parseDate = timeFormat("%m-%d-%Y");
        const initialData=[
            {
                "date": "2011-01-24",
                "x": 0,
                // "date": "Dec 5 2017, 01:44:27:567 AM",
                "open": 0.0601198904995,
                "high": 0.06896105357142858,
                "low": 0.0601198904995,
                "close": 0.066014,
                "volume": 1031788800,
                "side": "buy",
                "split": null,
                "dividend": null
            },
            {
                "date": "2011-01-25",
                "x": 1,
                // "date": "Dec 6 2017, 01:44:27:567 AM",
                "open": 0.06601434255122957,
                "high": 0.06955082283024748,
                "low": 0.06601434255122957,
                "close": 0.068372,
                "volume": 308160000,
                "side": "buy",
                "split": null,
                "dividend": null
            },
            {
                "date": "2011-01-26",
                "x": 2,
                // "date": "Dec 7 2017, 01:44:27:567 AM",
                "open": 0.06837217416688726,
                "high": 0.07014041763187856,
                "low": 0.06837217416688726,
                "close": 0.069551,
                "volume": 133171200,
                "side": "sell",
                "split": null,
                "dividend": null
            },
            {
                "date": "2011-01-27",
                "x": 3,
                // "date": "Dec 8 2017, 01:44:27:567 AM",
                "open": 0.06955022372932174,
                "high": 0.07013963478260869,
                "low": 0.06719259366198262,
                "close": 0.067782,
                "volume": 67766400,
                "side": "sell",
                "split": null,
                "dividend": null
            }
        ];
        // const data = initialData.forEach((d, i) => {
        //     d.date = new Date(parseDate(d.date).getTime());
            // console.log(d);
            // d.date = new Date(parseDate(d.date));
            // d.close = +d.close;
        // });
        const data = initialData.map((d, i) => {
            // d.date = new Date(parseDate(d.date).getTime());
            console.log(i, " initialData ==>", d);
            // d.date = new Date(parseDate(d.date));
            // d.close = +d.close;
            return {
                ...d,
                date: new Date(parseDate(d.date))
            }
        });



        console.log(data.length, data);


        const xScale = scaleLinear();
        const xExtents = [0, data.length - 1];
        // const xExtents = [new Date(2011, 0, 24), new Date(2011, 0, 27)];
         console.log(xExtents);
        // const xExtents = [0, 3];

        return (
            <ChartCanvas
                ratio={ratio}
                width={width}
                height={150}
                margin={{left: 0, right: 50, top: 0, bottom: 30}}
                seriesName="MSFT"
                data={data}
                type={type}
                xAccessor={d => d.x}
                // xAccessor={xAccessor}
                // xAccessor={d => {
                //         console.log ("xAccessor");
                //         console.log (d);
                //         return d.date
                //     }
                // }
                xExtents={xExtents}

                // xScale={scaleTime()}
                xScale={xScale}
            >
                <Chart id={0} yExtents={d => d.close}>
                {/*<Chart id={0} yExtents={d => d.totalVolume}>*/}
                    <XAxis
                        axisAt="bottom"
                        orient="bottom"
                        tickStroke={axisColor}
                    />
                    <YAxis
                        axisAt="right"
                        orient="right"
                        tickStroke={axisColor}
                    />
                    <AreaSeries yAccessor={d => d.side == "buy" && d.close} fill="#00FF00"/>
                    <AreaSeries yAccessor={d => d.side == "sell" && d.close} fill="#FF0000"/>
                    {/*<HoverTooltip*/}
                        {/*fontSize={15}*/}
                        {/*tooltipContent={tooltipContent([])}*/}
                        {/*yAccessor={d => d.totalVolume}*/}
                    {/*/>*/}
                </Chart>
            </ChartCanvas>
        );
    }
}

    DepthChart.propTypes = {
    data: PropTypes.array.isRequired,
    width: PropTypes.number.isRequired,
    ratio: PropTypes.number.isRequired,
    type: PropTypes.oneOf(["svg", "hybrid"]).isRequired,
};

    DepthChart.defaultProps = {
    type: "svg",
};
    DepthChart = fitDimensions(DepthChart);

    export default DepthChart;