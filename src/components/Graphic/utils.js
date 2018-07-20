import {timeParse} from "d3-time-format";

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

const parseDate = timeParse("%Y-%m-%d");

export function getData() {
    // const promiseMSFT = fetch("//rrag.github.io/react-stockcharts/data/MSFT.tsv")
    const promiseMSFT = fetch("//gofriends.ru/api/v1/quotations/1")
        .then(response => response.json())
        .then(data => {data.reduce((data, item) => {
                data.push(parseData(parseDate)(item));
                return data
            }, []);
        return data
        } );

    return promiseMSFT;
}
