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
console.log(today);
   
client.ping({

},async function getPapersOfToday(error) {    
     
    const response = await client.search({
    index: 'data',
    type: 'paper_metadata',
    body: {
        query: {
            match: {
                published: today
            }
        }
    }
})

for (const article of response.hits.hits) {
    console.log('article:', article);
}
    }); 
