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

// const parseDate = timeParse("%Y-%m-%d");
const parseDate = timeParse("%Y-%m-%dT%H:%M:%S.%LZ");

export function getData({pairId = 1, APIURL = `//gofriends.ru/api/v1/quotations`, dateFrom, dateTo, take = 10000, interval = "5min", appendFake = "true"}) {

// console.log(`${APIURL}?pairId=${pairId}&dateFrom=${dateFrom}&dateTo=${dateTo}&take=${take}&interval=${interval}&appendFake=${appendFake}`);
        // const promiseMSFT = fetch("http://gofriends.ru:3000/api/v1/timeframes?pairId=1&dateFrom=2018-01-04&dateTo=2018-07-29&take=100&interval=1hr&appendFake=true")
        const promiseMSFT = fetch(`${APIURL}?pairId=${pairId}&dateFrom=${dateFrom}&dateTo=${dateTo}&take=${take}&interval=${interval}&appendFake=${appendFake}`)
        .then(response => response.json())
        .then(data => {data.reduce((data, item) => {
                data.push(parseData(parseDate)(item));
                return data
            }, []);

        // console.log("getData:", data);
        return data
        } );

    return promiseMSFT;
}
