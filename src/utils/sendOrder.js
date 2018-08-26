import request from  'superagent' ;

 // export default async function sendRequestsendOrder ({rout, pairId = 1, balanceId = 1, type, price, amount, stop, limit}) {
 export default async function sendRequestsendOrder (bidProps) {
 //    const {rout, ...restProps} = bidProps;
    const {rout, ...restProps} = bidProps;
    const {pairId = 1, balanceId = 1, type, price, amount, stop, limit} = restProps
          // console.log("sendOrder", rout, restProps);

          request
              .post(rout)
              .set('Accept', 'application/json')
              .set('Content-Type', 'application/json')
              .send(
                  {
                        "pairId": pairId,
                         "balanceId": balanceId,
                        // "type": type,
                       // "amount": amount,
                      // "price": price,
                      ...restProps
                          }
              )
              .then(res => {
                  console.log(JSON.stringify(res));
                  return JSON.stringify(res);
              })
         .catch(err => { console.log( err.message, err.response, err);
         });

        // const rawResponse = await fetch(rout, {
        //     method: 'POST',
        //     headers: {
        //         'accept': 'application/json',
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         "pairId": 1,
        //         "balanceId": 1,
        //         "type": "buy",
        //         "amount":1,
        //         "price": 10
        //         }
        //     )
        // })
        //     .then(function(res){ return res.json(); })
        //     .then(function(data){ console.log("sendOrder:", JSON.stringify( data ) ) })
        // ;
        // const content = await rawResponse.json();
        //
        // console.log("sendOrder:", content);

    //
    // // fetch('http://142.93.81.111:3000/api/v1/orders', {
    // const rawResponse = await fetch(rout, {
    //     method: 'post',
    //     headers: {
    //         'accept': 'application/json',
    //         "Content-type": "application/json"
    //     },
    //     // body: {
    //     //         "pairId": pairId,
    //     //         "balanceId": balanceId,
    //     //         "type": type,
    //     //         "amount": amount,
    //     //         "price": price,
    //     //         }
    //     //     )
    //
    //
    //         body: JSON.stringify({
    //             pairId: 1,
    //             balanceId: 1,
    //             type: "buy",
    //             amount:1,
    //             price: 10
    //             })
    //
    // })
    //     .then(function(res){ return res.json(); })
    //     .then(function (data) {
    //         console.log('Request succeeded with JSON response', data);
    //     })
    //     .catch(function (error) {
    //         console.log('Request failed', error);
    //     });
}


// "stop": stop,
//     "limit": limit,
