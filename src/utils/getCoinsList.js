export default function getCoinsList (rout) {
    // console.log("getCoinsList", rout);

    const promiseData = fetch(`${rout}`)
        .then(response => response.json());
    return promiseData

}
