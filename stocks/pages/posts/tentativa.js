const { GoogleSpreadsheet } = require('google-spreadsheet');
const credentials = require('../../credentialsDrive.json');


function printStock(stock) {
  console.log(stock.DATA)
  console.log(stock.COMPANY)
  console.log(stock.TICKER)
  console.log(stock.PROFIT_PERCENT)
  console.log(stock.PROFIT_ABSOLUTE)
  console.log(stock.BUY_PRICE)
  console.log(stock.SHARES)
  console.log(stock.INVESTED_VALUE)
  console.log(stock.CURRENT)

  console.log('------------------')
}

async function getSpreadsheet(id) {
const doc = new GoogleSpreadsheet(credentials.sheet_id)
  await doc.useServiceAccountAuth({
    client_email: credentials.client_email,
    private_key: credentials.private_key
    });
  await doc.loadInfo(); // loads document properties and worksheets
  console.log(doc.title);
  const sheet = await doc.sheetsByTitle[`${id}`]
  const rows = await sheet.getRows({
    offset: 0,
    limit: 8,
  })
  rows.forEach(row => {
    printStock(row)
  })
  return rows
}

(async () => {
    const planilha = await getSpreadsheet(1)
    console.log(planilha)


})();


