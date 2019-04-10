/*
according to API description
http://gofriends.ru:3000/docs/#/Quotations/get_quotations__pairId_
*/

const SERVERS = {
        PRODUCT: {
            XHR: "https://demo.gofriends.pro",
            SOCKET: "https://demo.gofriends.pro/",
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
const detecteding = document.location.hostname !== "localhost"
    ? SERVERS.PRODUCT
    : SERVERS.DEV; /* <=== set here server what needs for developing -  */

export const current_server = detecteding;

console.log('document.location',detecteding, document.location,);
const ENV = process.env;
console.log(ENV);

// export const current_server = SERVERS.PRODUCT;

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



