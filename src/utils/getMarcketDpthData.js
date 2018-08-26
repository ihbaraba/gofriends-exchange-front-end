// import request from  'superagent' ;

export default function getMarcketDpthData({rout, type = "buy", book = 1, takeamount = 20}) {

    console.log("getMarcketDpthData", `${rout}?type=${type}&pairId=${book}&take=${takeamount}`);
    //
    // request
    //     .post(rout)
    //     .set('Accept', 'application/json')
    //     .set('Content-Type', 'application/json')
    //     .send(
    //         {
    //             "pairId": pairId,
    //             "balanceId": balanceId,
    //             "type": type,
    //             "amount": amount,
    //             "price": price,
    //         }
    //     )
    //     .then(res => {
    //         console.log(JSON.stringify(res));
    //         return JSON.stringify(res);
    //     })


    // const promiseMSFT = fetch(`//gofriends.ru/api/v1/orders?type=${type}&pairId=${book}&take=${takeamount}`)
    const promiseMSFT = fetch(`${rout}?type=${type}&pairId=${book}&take=${takeamount}`)
            .then(response => response.json())
        // .then(data => {data.reduce((data, item) => {
        //         data.push(parseData(parseDate)(item));
        //         return data
        //     }, []);
        // return data
        // } )
    ;

    return promiseMSFT;
}
