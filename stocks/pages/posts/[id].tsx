const { GoogleSpreadsheet } = require('google-spreadsheet');
const credentials = require('../../credentialsDrive.json');


export default function Post() {
    
    function printStock(stock) {
        return (
          <tr>
              <td>{stock.DATA}</td>
              <td>{stock.COMPANY}</td>
              <td>{stock.TICKER}</td>
              <td>{stock.PROFIT_PERCENT}</td>
              <td>{stock.PROFIT_ABSOLUTE}</td>
              <td>{stock.BUY_PRICE}</td>
              <td>{stock.SHARES}</td>
              <td>{stock.INVESTED_VALUE}</td>
              <td>{stock.CURRENT}</td>
          </tr>
        )
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
      
      getSpreadsheet(1).then(sheet => {
        printStock(sheet)
    });
      


    return (
        <div>
            <h1>Shares</h1>
            <table>
                <thead>
                    <tr>
                    <th>Data de Compra </th>
                    <th>Empresa </th>
                    <th>Ticker </th>
                    <th>Lucro % </th>
                    <th>Lucro Bruto </th>
                    <th>Cotação atual </th>
                    <th>Preço de compra </th>
                    <th>Numero de Ações </th>
                    <th>Valor Investido </th>
                    <th>Saldo Atual </th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>
    )
}