import React from "react";
import PropTypes from "prop-types";

import { scaleLinear } from "d3-scale";
import { curveStepBefore } from 'd3-shape';

import {ChartCanvas, Chart} from "react-stockcharts";
import { AreaSeries, } from "react-stockcharts/lib/series";
import {XAxis, YAxis} from "react-stockcharts/lib/axes";
import {fitDimensions} from "react-stockcharts/lib/helper";

const initialData = [
    {
        "date": "2011-01-24",
        "x": 0,
        "price": 42,
        "volume": 800,
        "side": "buy",
    },
    {
        "date": "2011-01-25",
        "x": 1,
        "price": 44,
        "volume": 30,
        "side": "buy",
    },
    {
        "date": "2011-01-26",
        "x": 2,
        "price": 55,
        "volume": 200,
        "side": "sell",
    },
    {
        "date": "2011-01-27",
        "x": 3,
        "price": 59,
        "volume": 400,
        "side": "sell",
    }
];

class DepthChart extends React.Component {
    constructor() {
        super();

        this.state = {
            data: initialData,
        };
}


    componentWillReceiveProps(nextProps) {
        const { sell, buy, } = nextProps;

        let sellVolume = 0;
        let buyVolume = 0;

        const buyArray = buy
            .sort( (a, b) => ( a.price < b.price ? 1 : -1) )
            .map( item => {
                buyVolume += item.amount;
                return ({"price": item.price, "volume": buyVolume,  "side": "buy", "id": item.id})
            });
        const sellArray = sell
            .sort( (a, b) => ( a.price > b.price ? 1 : -1) )
            .map( item => {
                sellVolume += item.amount;
                return ({"price": item.price, "volume": sellVolume,  "side": "sell", "id": item.id})
            });
        // const depthArray = sellArray.reverse().concat( buyArray).map( (item, idx) => ({ ...item, x: idx}));

/*
* option based on simple sorting by price. And applying it to horizontal axis
**/
        const depthArray = buyArray.concat(sellArray).sort((a, b) => ( a.price > b.price ? 1 : -1));
        this.setState({data: depthArray});
        // console.log("depthArray =", depthArray);
    }

    render() {
        const { data = [],} = this.state;

        const {
            height,
            type,
            margin,
            width,
            ratio,
            sell,
            buy,
        } = this.props;

        const axisColor = "#EEE";

        const xScale = scaleLinear();
        // const xExtents = [0, data.length - 1];
        const xExtents = [data[0]["price"], data[data.length - 1]["price"]];

        return (
            <ChartCanvas
                ratio={ratio}
                width={width}
                height={height}
                margin={{left: 0, right: 50, top: 0, bottom: 30}}
                seriesName="MSFT"
                data={data}
                type={type}
                // xAccessor={d => d.x}
                xAccessor={d => d.price}
                xExtents={xExtents}

                xScale={xScale}
                panEvent={false}
                zoomEvent={false}
            >
                <Chart id={0} yExtents={d => d.volume}>
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
                    <AreaSeries yAccessor={d => d.side == "buy" && d.volume} fill="#00FF00" interpolation={curveStepBefore}/>
                    <AreaSeries yAccessor={d => d.side == "sell" && d.volume} fill="#FF0000" interpolation={curveStepBefore}/>
                    {/*<HoverTooltip*/}
                        {/*fontSize={10}*/}
                        {/*tooltipContent={tooltipContent([])  }*/}
                        {/*yAccessor={d => d.volume}*/}
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