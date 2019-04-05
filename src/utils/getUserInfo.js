import request from  'superagent' ;

 export default async function getUserInfo ({rout, token}) {

          return request
              .get(rout)
              .set('Accept', 'application/json')
              .set('Content-Type', 'application/json')
              .set('Authorization', token)
              .query()
              // .then(res => {
              //     console.log(res);
              //     return res;
              // })
         .catch(err => {
             // console.log(" err.message=", err.message, "err.response=", err.response, "err=", err);
             // alert("Error: " +err.message);
             return {body: err.message}
         });
}
