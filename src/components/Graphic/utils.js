import {timeParse} from "d3-time-format";
import io from 'socket.io-client';

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

export function getDataFromSocket({point, id, stopTime = 0, callback}) {
    // console.log('state: ', this.state);
    const socket = io("http://gofriends.ru:3001");

    if (stopTime !== 0) {
        console.time("Getting data from socket time took");
    }

    // socket.on('connect_error', (error) => {
    //     console.error("Socket connection to server is fail", error);
    //     alert("Socket connection to server is fail", error);
    // });
    // socket.on('connect_failed', (error) => {
    //     console.error("Socket connection to server error", error);
    //     alert("Socket connection to server error", error);
    // });
    // socket.on('disconnect', (reason) => {
    //     if (reason === 'io server disconnect') {
    //         // the disconnection was initiated by the server, you need to reconnect manually
    //         socket.connect();
    //     }
    //     // else the socket will automatically try to reconnect
    // });

    socket.on(point + id, (bid) => {
        // console.log(point + id, bid);
        callback(bid);
        //
        // if (bid.completed) return;
        //
        // const line = {
        //     amount: bid.amount,
        //     price: bid.price,
        //     Sum: bid.amount * bid.price,
        //     quoteCurrency: bid.amount * bid.price,
        //     key: bid.id,
        //     completed: bid.completed
        // };
        //
        // const {marketDepth} = this.state;
        // const {buy, sell} = marketDepth;
        // // console.log(marketDepth, buy, sell);
        //
        // if (bid.type === "sell") {
        //     sell.unshift(line);
        // }
        // if (bid.type === "buy") {
        //     buy.unshift(line);
        // }
        //
        // this.setState({
        //     marketDepth: {
        //         ...marketDepth,
        //         buy,
        //         sell,
        //     }
        // });
    });

    // socket.on(point + id, (bid) => {
    //     callback(bid);
        //
        // const {marketDepth} = this.state;
        // const {buy, sell} = marketDepth;
        //
        // const resOfSearchInBuy = buy.findIndex(item => item.id === bid.id);
        // const resOfSearchInSell = sell.findIndex(item => item.id === bid.id);
        //
        // const flagBuy = (resOfSearchInBuy !== -1);
        // const flagSell = (resOfSearchInSell !== -1);
        //
        // console.log(point + id, bid.id, bid);
        //
        // if (flagSell && !bid.completed) {
        //     const foundElement = sell[resOfSearchInSell];
        //     sell[resOfSearchInSell] = {...foundElement, amount: foundElement["amount"] - bid.amount}
        // }
        // if (flagBuy && !bid.completed) {
        //     const foundElement = buy[resOfSearchInBuy];
        //     sell[resOfSearchInBuy] = {...foundElement, amount: foundElement["amount"] - bid.amount}
        // }
        //
        // const filtredBuy = (flagBuy && bid.completed) ? buy.splice(resOfSearchInBuy, 1) : buy; // remove element
        // const filtredSell = (flagSell && bid.completed) ? sell.splice(resOfSearchInSell, 1) : sell;
        //
        // this.setState({
        //     marketDepth: {
        //         buy: filtredSell,
        //         sell: filtredBuy,
        //     }
        // });
    // });

    if (stopTime !== 0) {
        setTimeout(() => {
            // console.log("closing");
            console.timeEnd("Getting data from socket time took");
            socket.close();
        }, stopTime);
    }
}
