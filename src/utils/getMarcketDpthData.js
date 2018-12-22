export default function getMarcketDpthData({rout, type = "buy", book = 1, takeamount = 20, completed = false, withStop = false}) {
    const promiseMSFT = fetch(`${rout}?type=${type}&pairId=${book}&take=${takeamount}&completed=${completed}&withStop=${withStop}`)
        .then(response => response.json());

    return promiseMSFT;
}
