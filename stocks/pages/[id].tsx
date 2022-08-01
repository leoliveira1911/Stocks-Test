import { google } from 'googleapis'
import { setTimeout } from 'timers/promises';

export async function getServerSideProps({ query }) {

    const auth = new google.auth.GoogleAuth({
        keyFile: "credentialsDrive.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets"
    });
    const sheets = google.sheets({ version: 'v4', auth })
    const { id } = query
    const range = `${id}!A:J`
    const response = await sheets.spreadsheets.values.get({
        spreadsheetId: process.env.SHEET_ID,
        range
    })
    const rows = response.data.values
    return {
        props: {
            rows,
        }
    }

}

export default function Post({ rows }) {


    function calcValues(data) {
        let invested = 0
        let current = 0
        let rowCount = 0
        data.map((el) => {
            if (el[0] != "" && el[0] != 'DATA') {
                let stringInvestedBeforeTreat = el[8]
                let stringInvestedAfterTreat = stringInvestedBeforeTreat.replace('R$', '').replace(',', '.').replace(' ', '')
                let valueInvested = parseFloat(stringInvestedAfterTreat)
                invested = invested + valueInvested

                let stringCurrentBeforeTreat = el[9]
                let stringCurrentAfterTreat = stringCurrentBeforeTreat.replace('R$', '').replace(',', '.').replace(' ', '')
                let valueCurrent = parseFloat(stringCurrentAfterTreat)
                current = current + valueCurrent

                rowCount = rowCount + 1
            }
        })

        let profitPercent = (((current - invested) / invested) * 100).toFixed(2)
        let absolute = (current - invested).toFixed(2)
        let values = {
            profitPercent,
            invested: invested.toFixed(2) ,
            current: current.toFixed(2) ,
            absolute,
            rowCount
        }
        return values
    }

    function renderData(data) {
        return data.map((el, index) => {
            if (el[0] != "" && index > 0)
                return (
                    <tr key={index}>
                        <td>{el[0]}</td>
                        <td>{el[1]}</td>
                        <td>{el[2]}</td>
                        <td>{el[3]}</td>
                        <td>{el[4]}</td>
                        <td>{el[5]}</td>
                        <td>{el[6]}</td>
                        <td>{el[7]}</td>
                        <td>{el[8]}</td>
                        <td>{el[9]}</td>
                    </tr>
                )
        })
    }
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
                    {renderData(rows)}
                    <tr>
                        <td>Total</td>
                        <td></td>
                        <td></td>
                        <td>{calcValues(rows).profitPercent}%</td>
                        <td>{calcValues(rows).absolute}</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>{calcValues(rows).invested}</td>
                        <td>{calcValues(rows).current}</td>
                    </tr>
                </tbody>
            </table>
            <div>
                <h1>Contagem de ações: {calcValues(rows).rowCount} </h1>
            </div>
        </div>
    )
}