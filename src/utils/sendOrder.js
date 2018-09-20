import request from  'superagent' ;

 // export default async function sendRequestsendOrder ({rout, pairId = 1, balanceId = 1, type, price, amount, stop, limit}) {
 export default async function sendRequestsendOrder (bidProps) {
 //    const {rout, ...restProps} = bidProps;
    const {rout, token, ...restProps} = bidProps;
    const {pairId, balanceId, type, price, amount, stop, limit} = restProps
          // console.log("sendOrder", rout, restProps, token);
    return await request
              .post(rout)
              .set('Accept', 'application/json')
              .set('Content-Type', 'application/json')
              .set('Authorization', token)
              .send(
                  {
                        "pairId": pairId,
                      "balanceId": balanceId,
                      ...restProps
                          }
              )
              .then(res => {
                  // console.log(res);
                  return res.body;
              })
         .catch(err => { console.log( err.message, err.response, err);
         });
}