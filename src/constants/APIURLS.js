/*
according to API description
http://gofriends.ru:3000/docs/#/Quotations/get_quotations__pairId_
*/

const SERVERS = {
    EXCHANGE: {
        XHR: "https://demo.gofriends.pro/api/v1/",
        SOCKET: "wss://demo.gofriends.pro",
    },
    PRODUCT: {
        XHR: "https://demo.gofriends.pro/api/v1/",
        SOCKET: "wss://demo.gofriends.pro",
    },
    DEV: {
        XHR: "https://dev.gofriends.pro/api/v1/",
        SOCKET: "wss://dev.gofriends.pro",
    },
};

/*
* Getting current URL.
* Aiming to avoid wrong backend server address
* If it is not "localhost" setting SERVERS.PRODUCT
* */

// console.log('document.location', document.location.hostname, typeof document.location.hostname, document.location,);

// const generatedDetected = {
//     XHR: `https://${document.location.hostname}/api/v1/`,
//     SOCKET: `https://${document.location.hostname}/`,
// };

const generatedDetected = {
    XHR: `https://${document.location.hostname}/api/v1/`,
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

export const PAIRS = `${current_server.XHR}pairs`;

export const MARKETS = `${current_server.XHR}markets`;

export const MARKETS_START_PAGE = `${current_server.XHR}markets/daily`;

export const ORDERS = `${current_server.XHR}orders`;

export const USERORDERSHISTORY = `${current_server.XHR}users/me/orders`;

export const ORDERSHISTORY = `${current_server.XHR}orders`;

export const USERINFO = `${current_server.XHR}users/me`;

export const SOCKET_SOURCE = `${current_server.SOCKET}`;

export const COUNTRIES = `${current_server.XHR}countries`;

export const REGISTER = `${current_server.XHR}auth/register`;

export const REGISTER_CONFIRM = `${current_server.XHR}auth/register/confirm`;

export const LOGIN = `${current_server.XHR}auth/login`;

//orders
export const ORDERS_PAIR = `${current_server.XHR}orders/pair`;

//user api urls
export const TWO_FACTOR_AUTHENTICATION = `${current_server.XHR}auth/twofactor`;

export const CHANGE_PASSWORD = `${current_server.XHR}auth/password`;

export const CHANGE_PASSWORD_CONFIRM = `${current_server.XHR}auth/password/confirm`;

export const GET_USER_DEPOSITS = `${current_server.XHR}users/me/deposits`;

//contact us
export const SEND_TICKETS = `${current_server.XHR}tickets`;

//ADMIN PANEL
//users page
export const GET_USERS = `${current_server.XHR}users`;
export const GET_ADMINS = `${current_server.XHR}users/admin`;
export const USER_PROFILE = `${current_server.XHR}users`;

//dashboard page
export const DASHBOARD_INFO = `${current_server.XHR}stats`;

//settings page
export const REGISTRATION_SETTINGS = `${current_server.XHR}settings`;
export const EMAIL_SETTINGS = `${current_server.XHR}mailer/templates`;

//trade history page
export const GET_TRADE_HISTORY = `${current_server.XHR}orders/history`;

//withdraw user and admin list  page
export const WITHDRAW = `${current_server.XHR}withdraw`;
export const CONFIRM_WITHDRAW = `${current_server.XHR}withdraw/confirm`;
export const WALLETS = `${current_server.XHR}wallets/stat`;
export const USER_WALLETS = `${current_server.XHR}users/balances`;
export const APPROVE = `${current_server.XHR}withdraw/approve`;

//all report page
export const GET_REPORT_BY_DATE = `${current_server.XHR}transactions`;

//news page
export const NEWS = `${current_server.XHR}news`;


//commissions page
export const COMMISSIONS = `${current_server.XHR}fee`;
export const COMMISSIONS_PROFIT = `${current_server.XHR}transactions/fee`;

//currencies
export const CURRENCIES = `${current_server.XHR}currencies`;


//verification
export const VERIFICATION = `${current_server.XHR}users/me/profile`;
export const VERIFY = `${current_server.XHR}users`;






