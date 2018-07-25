
export default function getMarcketDpthData({type = "buy", book = 1}) {

    /*
    * book is id of tokens pair
    * */

    //http://localhost:3000/api/v1/orders?type=buy&book=5

    const promiseMSFT = fetch(`//gofriends.ru/api/v1/orders?type=${type}&book=${book}`)
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
