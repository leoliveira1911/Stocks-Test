const finnhub = require('finnhub');

const api_key = finnhub.ApiClient.instance.authentications['api_key'];
api_key.apiKey = "cc1ssmiad3icrd10jkug" // Replace this
const finnhubClient = new finnhub.DefaultApi()


finnhubClient.stockCandles("AAPL", "D", 1590988249, 1591852249, (error, data, response) => {
  console.log(data)
});