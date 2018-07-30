export default async function sendOrder ({rout, pairId = 1, balanceId = 0, type, price, amount}) {
    // console.log("sendOrder", rout);

    // const promiseData = fetch(`${rout}`)
    //     .then(response => response.json());
    // return promiseData
        const rawResponse = await fetch(`${rout}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    "pairId": pairId,
                    "balanceId": balanceId,
                    "type": type,
                    "status": "string",
                    "amount": amount,
                    "price": price
                }
            )
        });
        const content = await rawResponse.json();

        console.log("sendOrder:", content);
}
