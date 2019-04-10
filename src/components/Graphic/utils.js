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

function parseCryptocompareData(parse) {
    return function (d) {
        // console.log("d = ", d);
        d.date = parse(d.time);
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

export const getData = async ({pairId = 1, APIURL = QUOTATIONS, dateFrom, dateTo, take = 10000, interval = "5min", appendFake = "true"}) => {
    try {
        const promiseMSFT = await fetch(`${APIURL}?pairId=${pairId}&dateFrom=${dateFrom}&dateTo=${dateTo}&take=${take}&interval=${interval}&appendFake=${appendFake}`)
            .then(response => response.json())
            .then(data => {
                data.reduce((data, item) => {
                    data.push(parseData(parseDate)(item));
                    return data
                }, []);

                // console.log("getData:", data);
                return data
            });

        return promiseMSFT;
    } catch (e) {
        console.log(e);
    }
};

export function getDataFromSocket({point, id, stopTime = 0, callback}) {
    // console.log('state: ', this.state);
    const socket = io(SOCKET_SOURCE);

    if (stopTime !== 0) {
        console.time("Getting data from socket time took");
    }

    socket.on(point + id, (bid) => {
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


export async function sendRequest({rout, options}) {
    const rawResponse = await fetch(`${rout}`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(options)
    });
    // const content = await rawResponse.json();
    // console.log("content =", content);

    return rawResponse.json();
}

export async function coinapiHystoricalData(
    {
        // APIURL = "https://min-api.cryptocompare.com/data/histoday?fsym=BTC&tsym=USD&limit=200",
        APIURL = "https://min-api.cryptocompare.com/data/histoday",
        fsym = "BTC",
        tsym = "USD",
        limit = 200,
    } = {}
) {
    // const promiseMSFT = fetch
    console.log(`${APIURL}?fsym=${fsym}&tsym=${tsym}&limit=${limit}`);
    const promiseMSFT = fetch(`${APIURL}?fsym=${fsym}&tsym=${tsym}&limit=${limit}`)
        .then(response => response.json())
        .then(data => {
            // console.log("getData:", data);
            return data["Data"].reduce((data, item) => {

                data.push(parseCryptocompareData(Time => (new Date(Time * 1000)))(item));
                // console.log("item = ", item, " | ", data);
                return data
            }, []);
        });

    return promiseMSFT;
}