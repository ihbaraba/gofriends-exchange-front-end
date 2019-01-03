import React from 'react';

let  testData = [
    {
        id: 1,
        createDate: '2018-05-31 17:34:34',
        text: 'We understand that there are some concerns about our process\n' +
        '                    to verify\n' +
        '                    legacy accounts. Although we are actively encouraging customers to complete the\n' +
        '                    process within the next two weeks and doing our best to address any issues that\n' +
        '                    may\n' +
        '                    arise, there will be customers who are unable to complete the process in that\n' +
        '                    timeframe. These customers will still have the option to complete verification\n' +
        '                    to\n' +
        '                    restore full account functionality, but meanwhile will not be able to trade or\n' +
        '                    withdraw funds. At all times, their funds will be safe and accounted for. As a\n' +
        '                    reminder, please beware of scams - at no point in time will we ask for a deposit\n' +
        '                    to\n' +
        '                    restore account functionality.'
    },
    {
        id: 2,
        createDate: '2019-05-31 17:34:34',
        text: " Note that the STORJ team is offering to exchange SJCX for STORJ. For more information please visit <a href=\"https://sjcxto.storj.io\">https://sjcxto.storj.io</a>"
    },
];


const Notices = ()=> {
    return (
        <div className="data" id="noticesBoard">
            {testData.map(item => {
                return(
                    <div className="msg" key={item.id}>
                        <div
                            className="info"
                            dangerouslySetInnerHTML={{__html: item.text}}
                        >
                        </div>

                        <div className="by">Posted by <strong>Beetok Team</strong> at {item.createDate}
                        </div>
                    </div>
                )
            })}

        </div>

    )
}

export default Notices;