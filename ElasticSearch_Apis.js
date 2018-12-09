var elasticsearch = require('elasticsearch');

var subDays = require('date-fns/sub_days');
var subMonths = require('date-fns/sub_months');
var subWeeks = require('date-fns/sub_weeks');
var subYears = require('date-fns/sub_years')
var format = require('date-fns/format')

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
    var result5 = subDays(today, 1);

    var lastDayDates = format(
        result5,
        'YYYY-MM-DD'
    )
    
    //console.log("!**********Last One Day Papers***********!");

    const lastOneDayPapers = await client.search({
        index: 'data',
        type: 'paper_metadata',
        body: {
            query: {
                match: {
                    published: lastDayDates
                }
            }
        }
    })

    //for (const article of lastOneDayPapers.hits.hits) {
      //  console.log('lastOneDayPapers: ', lastOneDayPapers);
    //}

    var result6 = subDays(today, 2);
    var result7 = subDays(today, 3);

    var lastTwoDayDates = format(
        result6,
        'YYYY-MM-DD'
    )
    
    var lastThreeDayDates = format(
        result7,
        'YYYY-MM-DD'
    )

    //console.log("!**********Last 3 days Papers***********!");

    const lastThreeDaysPapers = await client.search({
        index: 'data',
        type: 'paper_metadata',
        body: {
            query: {
                terms: {
                    published: [lastDayDates, lastTwoDayDates, lastThreeDayDates]
                }
            }
        }
    });

    //for (const article of lastThreeDaysPapers.hits.hits) {
      //  console.log('LastThreeDaysPapers:', lastThreeDaysPapers);
    //}

    var result1 = subWeeks(today, 1); 

    var lastWeekDates = format(
        result1,
        'YYYY-MM-DD'
    )
    //console.log("!**********Last Week Papers***********!");

    const getLastWeekPapers = await client.search({
        index: 'data',
        type: 'paper_metadata',
        body: {
            query: {
                range: {
                    published: {
                        gt: lastWeekDates,
                        lt: today
                    }
                }
            }
        }

    });

    //for (const article of getLastWeekPapers.hits.hits) {
      //  console.log('LastWeekPapers:', getLastWeekPapers);
    //}

        var result3 = subMonths(today, 1);

        var lastMonthDates = format(
            result3,
            'YYYY-MM-DD'
        )
      //  console.log("!**********Last Month Papers***********!");

        const getLastMonthPapers = await client.search({
            index: 'data',
            type: 'paper_metadata',
            body: {
                query: {
                    range: {
                        published: {
                            gt: lastMonthDates,
                            lt: today
                        }
                    }
                }
            }

        });

        //for (const article of getLastMonthPapers.hits.hits) {
        //    console.log('LastMonthPapers:', getLastMonthPapers);
        //}


    var result2 = subMonths(today, 6);
    
    var lastSixMonthsDates = format(
        result2,
        'YYYY-MM-DD'
    )
    //console.log("!**********Last Six Months Papers***********!");
    
        const getLastSixMonthsPapers = await client.search({
            index: 'data',
            type: 'paper_metadata',
            body: {
                query: {
                    range: {
                        published: {
                            gt: lastSixMonthsDates ,
                            lt: today
                        }
                    }
                }
            }
         
        });
        
    //for (const article of getLastSixMonthsPapers.hits.hits) {
      //   console.log('LastSixMonthsPapers:', getLastSixMonthsPapers);
     //}

var result4 = subYears(today, 1);

var lastOneYearDates = format(
    result4,
    'YYYY-MM-DD'
)
//console.log("!**********Last One Year Papers***********!");

const getLastOneYearPapers = await client.search({
    index: 'data',
    type: 'paper_metadata',
    body: {
        query: {
            range: {
                published: {
                    gt: lastOneYearDates,
                    lt: today
                }
            }
        }
    }

});

//for (const article of getLastOneYearPapers.hits.hits) {
   // console.log('LastOneYearPapers:', getLastOneYearPapers);
//}

});

