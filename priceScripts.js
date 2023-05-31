const axios = require("axios");
const cheerio = require("cheerio");

async function getStockPrice(symbol) {
  try {
    const url = `https://fundamentus.com.br/detalhes.php?papel=${symbol}`;
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const companyName = $(`td:contains("Empresa")`).next().text();
    console.log(companyName);
    const priceElement = $("td.data.destaque.w3").text().trim();
    console.log("price elemnt: " + priceElement);
    if (priceElement) {
      return { priceElement, companyName };
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error retrieving stock price:", error);
    return null;
  }
}
//exemplo
const stockSymbol = "bbas3";
getStockPrice(stockSymbol)
  .then((info) => {
    console.log(
      `The current price of ${info.companyName} is: ${info.priceElement}`
    );
  })
  .catch((error) => {
    console.error("Error:", error);
  });
