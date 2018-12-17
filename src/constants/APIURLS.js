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
        XHR: "http://ex.dev.gofriends.pro/api/v1/",
        SOCKET: "http://142.93.81.111:3001",
    },
};

/*
* Getting current URL.
* Aiming to avoid wrong backend server address
* If it is not "localhost" setting SERVERS.PRODUCT
* */

// console.log('document.location', document.location.hostname, typeof document.location.hostname, document.location,);

const generatedDetected = {
    XHR: `https://${document.location.hostname}`,
    SOCKET: `wss://${document.location.hostname}/`,
};


const detected = document.location.hostname === "localhost"
    ? SERVERS.DEV /* <=== set here server what needs for developing -  */
    : generatedDetected;

export const current_server = detected;

// const ENV = process.env;

// console.log('detected=', detected, current_server);
// console.log("process.env=", ENV);

/**************************
 * get initial data
 */
/*
get initial data from our API for the chart
* */
const OUR_TIMEFRAMES = `${current_server.XHR}timeframes`;

/*
get initial data from CRIPTOCOMPARE API for the chart
https://min-api.cryptocompare.com/data/histoday?fsym=BTC&tsym=USD&limit=200
https://min-api.cryptocompare.com/
https://docs.coinapi.io/?shell#list-all-periods
* */
// const CRIPTOCOMPARE_TIMEFRAMES = `https://min-api.cryptocompare.com/data/histoday`;

export const TIMEFRAMES = OUR_TIMEFRAMES; // OUR_TIMEFRAMES or CRIPTOCOMPARE_TIMEFRAMES

/**************************
 */

/*load data for chart*/
export const QUOTATIONS = `${current_server.XHR}quotations`;

export const PAIRS = `${current_server.XHR}pairs/`;

export const MARKETS = `${current_server.XHR}markets/`;

export const ORDERS = `${current_server.XHR}orders`;

export const USERORDERSHISTORY = `${current_server.XHR}users/me/orders`;

export const ORDERSHISTORY = `${current_server.XHR}orders`;

export const USERINFO = `${current_server.XHR}users/me`;

export const SOCKET_SOURCE = `${current_server.SOCKET}`;

export const COUNTRIES = `${current_server.XHR}countries`;

export const REGISTER = `${current_server.XHR}auth/register`;

export const LOGIN = `${current_server.XHR}auth/login`;


//user api urls
export const TWO_FACTOR_AUTHENTICATION = `${current_server.XHR}auth/twofactor`;

export const CHANGE_PASSWORD = `${current_server.XHR}auth/password`;



