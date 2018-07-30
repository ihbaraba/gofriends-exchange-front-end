
export default function getMarcketDpthData({type = "buy", book = 1, takeamount = 20}) {

    /*
    * book is id of tokens pair
    * */

    // const promiseMSFT = fetch(`//gofriends.ru/api/v1/orders?type=${type}&book=${book}`)
    const promiseMSFT = fetch(`//gofriends.ru/api/v1/orders?type=${type}&pairId=${book}&take=${takeamount}`)
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
