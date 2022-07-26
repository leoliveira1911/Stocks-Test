import { google } from 'googleapis'


export async function getServerSideProps({query}) {

    const auth = new google.auth.GoogleAuth({
        keyFile: "credentials.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets"
    });
    const sheets = google.sheets({version: 'v4' , auth})
    const {id} = query
    const range = `Stocks!A:J`
    const response = await sheets.spreadsheets.values.get({
        spreadsheetId: process.env.SHEET_ID,
        range
    })

    const rows = response.data.values
    return {
        props: {
            rows
        }
    }
}

export default function Post({rows}) {
    
    function calcProfit(data) {
        let profit = 0
        data.map((el) => {
            profit = profit + el[4]
            return profit
        })
        return(
            <tr>
                <td>
                    Lucro Bruto Total
                </td>
                <td>
                    {profit}
                </td>
            </tr>
            
        )
    }

    function renderData(data) {
        return data.map((el)=> {
            if (el[0] != "")
            return (
            <tr>
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
                   
                </tbody>
            </table>
        </div>
    )
}