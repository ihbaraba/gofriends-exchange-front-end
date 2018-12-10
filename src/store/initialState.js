import * as d3 from "d3";
import {intervalInDays} from "../utils";

const interval = "1hr";
const numbeOfCandlesInitially = 3 * 24 * 20;

function initialRange() {
    const currentDate = new Date();
    const format = d3.timeFormat("%Y-%m-%d");
    const currentDatePlusOdin = d3.timeDay.offset(currentDate, intervalInDays(interval, 1) ) ;
    const offsetData = d3.timeDay.offset(currentDate, (-1) * intervalInDays(interval, numbeOfCandlesInitially) ) ;

    return ({
        dateFrom: format(offsetData),
        dateTo: format(currentDatePlusOdin),
    });
}

const initialState = {
    interval,
    chartRange: {
                start: "",
                end: "",
                ...initialRange(),
        },
    appendFake: "false",
    pair:  {
        id: 1,
        name: "order_created_1",
        first: "BTC",
        baseCurrency: "BTC",
        second: "ETH",
        quoteCurrency: "ETH",
    },
    user: {
        email: "Unauthorized",
        username: "Unauthorized",
        countryId: 1,
        password: "1",
        token: sessionStorage.getItem("exchange_token"),
        orders: new Set(),
    },
};

export default initialState;