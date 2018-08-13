import {timeParse} from "d3-time-format";
import io from 'socket.io-client';
import {SOCKET_SOURCE, QUOTATIONS} from "./../../constants/APIURLS.js"

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

// export function getData({pairId = 1, APIURL = `//gofriends.ru/api/v1/quotations`, dateFrom, dateTo, take = 10000, interval = "5min", appendFake = "true"}) {
export function getData({pairId = 1, APIURL = QUOTATIONS, dateFrom, dateTo, take = 10000, interval = "5min", appendFake = "true"}) {

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

export function getDataFromSocket({point, id, stopTime = 0, callback}) {
    // console.log('state: ', this.state);
    // const socket = io("http://gofriends.ru:3001");
    const socket = io(SOCKET_SOURCE);

    if (stopTime !== 0) {
        console.time("Getting data from socket time took");
    }

    socket.on(point + id, (bid) => {
        // console.log(point + id, bid);
        callback(bid);

    });


    if (stopTime !== 0) {
        setTimeout(() => {
            // console.log("closing");
            console.timeEnd("Getting data from socket time took");
            socket.close();
        }, stopTime);
    }
}


export async function sendRequest ({rout, options}) {
    console.log("sendRequest", rout, JSON.stringify(options));

    const rawResponse = await fetch(`${rout}`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(options)
    });
    const content = await rawResponse.json();

    console.log("content =", content);
}
