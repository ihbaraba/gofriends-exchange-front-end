export default function getCoinsList(rout) {
    const promiseData = fetch(`${rout}`)
        .then(response => response.json());
    return promiseData
}
