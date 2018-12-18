import moment from 'moment';

const interval = "1hr";

function initialRange() {
    const currentDate = moment(new Date()).format('YYYY-MM-DD');
    const offsetData = moment(new Date()).subtract(1, "month").format('YYYY-MM-DD');

    return ({
        dateFrom: offsetData,
        dateTo: currentDate,
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
    pair: {
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