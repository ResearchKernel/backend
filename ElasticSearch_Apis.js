var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
    host: 'https://search-researchkernel-634iskudbbrvfruaytepewyo3i.us-east-1.es.amazonaws.com/',
    log: 'trace'
});

//****** Sun Nov 25 2018 11: 32: 02 GMT + 0530(India Standard Time) "published": "2018-09-27T11:31:43Z",


var today = new Date();

var dd = today.getDate();
var mm = today.getMonth() + 1; //January is 0!
var yyyy = today.getFullYear();

if (dd < 10) {
    dd = '0' + dd
}

if (mm < 10) {
    mm = '0' + mm
}

today = yyyy + '-' + mm + '-' + dd;

client.ping({

}, async function getPapersByDate(error) {
    
    date = yyyy + '-' + mm + '-' + Number(dd - 1);
    
        const lastOneDayPapers = await client.search({
            index: 'data',
            type: 'paper_metadata',
            body: {
                query: {
                    match: {
                        published: date
                        }
                    }
                }
            })

        for (const article of lastOneDayPapers.hits.hits) {
             console.log('lastOneDayPapers: ', lastOneDayPapers);
            }

    date2 = yyyy + '-' + mm + '-' + Number(dd - 2);
    date3 = yyyy + '-' + mm + '-' + Number(dd - 3);
      
        const lastThreeDaysPapers = await client.search({
            index: 'data',
            type: 'paper_metadata',
            body: {
                query: {
                    terms: {
                        published: [date,date2,date3]
                    }
                }
            }
        });

        for (const article of lastThreeDaysPapers.hits.hits) {
            console.log('LastThreeDaysPapers:', lastThreeDaysPapers);
        }

    });
        // date = yyyy + '-' + mm + '-' + Number(dd - 2);
        // const response2 = await client.search({
        //     index: 'data',
        //     type: 'paper_metadata',
        //     body: {
        //         query: {
        //             match: {
        //                 published: date
        //             }
        //         }
        //     }
        // });

        // for (const article of response2.hits.hits) {
        //     console.log('article:', article);
        // }

        // date = yyyy + '-' + mm + '-' + Number(dd - 3);
        // const response3 = await client.search({
        //     index: 'data',
        //     type: 'paper_metadata',
        //     body: {
        //         query: {
        //             match: {
        //                 published: date
        //             }
        //         }
        //     }
        // });

        // for (const article of response3.hits.hits) {
        //     console.log('article:', article);
        // }
    
