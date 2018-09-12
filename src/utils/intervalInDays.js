const intervalInDays = (interval, period) => {
    switch (interval) {
        case "5min" : {return Math.ceil(period * 5 / 60 / 24) }
        case "15min" : {return Math.ceil(period * 15 / 60 / 24) }
        case "30min" : {return Math.ceil(period * 30 / 60 / 24) }
        case "1hr" : {return Math.ceil(period * 60 / 60 / 24) }
        case "2hr" : {return Math.ceil(period * 120 / 60 / 24) }
        case "4hr" : {return Math.ceil(period * 240 / 60 / 24) }
        case "1day" : {return Math.ceil(period * 1)}
        default : return 1
    }
};

export default intervalInDays;