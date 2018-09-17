/*
according to API description
http://gofriends.ru:3000/docs/#/Quotations/get_quotations__pairId_
*/

const SERVERS = {
    EXCHANGE: {
        XHR: "https://exchange.gofriends.pro",
        SOCKET: "wss://exchange.gofriends.pro/",
    },
    PRODUCT: {
        XHR: "https://demo.gofriends.pro",
        SOCKET: "wss://demo.gofriends.pro/",
    },
    DEV: {
        XHR: "http://142.93.81.111:3000",
        SOCKET: "http://142.93.81.111:3001",
    },
};


/*
* Getting current URL.
* Aiming to avoid wrong backend server address
* If it is not "localhost" setting SERVERS.PRODUCT
* */
const detected = document.location.hostname !== "localhost"
    ? SERVERS.EXCHANGE
    : SERVERS.DEV; /* <=== set here server what needs for developing -  */

export const current_server = detected;

console.log('document.location', document.location.hostname, typeof document.location.hostname, document.location,);
console.log('detected=', detected, current_server);
const ENV = process.env;
console.log("process.env=", ENV);


/**************************
 * get initial data
 */
/*
get initial data from our API for the chart
* */
const OUR_TIMEFRAMES = `${current_server.XHR}/api/v1/timeframes`;

/*
get initial data from CRIPTOCOMPARE API for the chart
https://min-api.cryptocompare.com/data/histoday?fsym=BTC&tsym=USD&limit=200
https://min-api.cryptocompare.com/
https://docs.coinapi.io/?shell#list-all-periods
* */
const CRIPTOCOMPARE_TIMEFRAMES = `https://min-api.cryptocompare.com/data/histoday`;

export const TIMEFRAMES = OUR_TIMEFRAMES; // OUR_TIMEFRAMES or CRIPTOCOMPARE_TIMEFRAMES

/**************************
 */

/*load data for chart*/
export const QUOTATIONS = `${current_server.XHR}/api/v1/quotations`;

export const PAIRS = `${current_server.XHR}/api/v1/pairs/`;

export const MARKETS = `${current_server.XHR}/api/v1/markets/`;

export const ORDERS = `${current_server.XHR}/api/v1/orders`;

export const USERORDERSHISTORY = `${current_server.XHR}/api/v1/users/me/orders`;

export const ORDERSHISTORY = `${current_server.XHR}/api/v1/orders`;

export const USERINFO = `${current_server.XHR}/api/v1/users/me`;

export const SOCKET_SOURCE = `${current_server.SOCKET}`;

export const COUNTRIES = `${current_server.XHR}/api/v1/countries`;

export const REGISTER = `${current_server.XHR}/api/v1/auth/register`;

export const LOGIN = `${current_server.XHR}/api/v1/auth/login`;



