var nytData = [];
var nytTimeParse = d3.utcParse("%Y-%m-%dT%H:%M:%SZ");
// NYT API
var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
url += '?' + $.param({
  'api-key': "59ab1883397c42beacad6f8d070b68d6",
  'q': "middle east",
  'fl': "web_url,snippet,headline,pub_date"
});
$.ajax({
  url: url,
  method: 'GET',
}).done(function(result) {
  console.log(result);
  parseData(result); //this tosses the "result"" down to the function
}).fail(function(err) {
  throw err;
});
// Parsing data
function parseData(result) {
  console.log(result.response.docs);
  var temp = result.response.docs;
  var tempCleanDate
  for (var i = 0; i < temp.length; i++) {
    tempCleanDate = nytTimeParse(temp[i].pub_date)
    nytData.push(
      {
        "year":(tempCleanDate.getFullYear()),
        "headline":temp[i].headline.main
      }
    )
  }
}
