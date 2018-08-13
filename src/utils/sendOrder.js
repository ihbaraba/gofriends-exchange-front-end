export default async function sendRequestsendOrder ({rout, pairId = 1, balanceId = 1, type, price, amount}) {
    // console.log("sendOrder", rout, pairId, balanceId, type, price, amount);

        const rawResponse = await fetch(`${rout}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
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

        // console.log("sendOrder:", content);
}
