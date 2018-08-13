/*
according to API description
http://gofriends.ru:3000/docs/#/Quotations/get_quotations__pairId_
*/


const XHR_PORT = "3000";
const SOCKET_PORT = "3001";
const PRODACT_SERVER = "http://gofriends.ru";
const DEV_SERVER = "http://142.93.81.111";

export const current_server = DEV_SERVER;


/*
get data for the chart
http://gofriends.ru:3000/api/v1/timeframes?pairId=1&dateFrom=2018-01-01&dateTo=2018-07-31&take=20&interval=5min&appendFake=false
* */
export const TIMEFRAMES = `${current_server}:${XHR_PORT}/api/v1/timeframes`;

/*load data for chart*/
export const QUOTATIONS = `${current_server}:${XHR_PORT}/api/v1/quotations`;

/*
get currencies pairs
No parameters
* */
export const PAIRS = `${current_server}:${XHR_PORT}/api/v1/pairs/`;

export const ORDERS = `${current_server}:${XHR_PORT}/api/v1/orders`;

export const SOCKET_SOURCE = `${current_server}:${SOCKET_PORT}`;

export const COUNTRIES = `${current_server}:${XHR_PORT}/api/v1/countries`;

export const REGISTER = `${current_server}:${XHR_PORT}/api/v1/auth/register`;


