const initialState = {
    // chart: {
    interval: "1hr",
    chart_range: {
                start: "",
                end: "",
        },
    appendFake: "false",
    // },
    // exchange:  {
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
        token: localStorage.getItem("exchange_token"),
        orders: new Set(),
    },
};

export default initialState;