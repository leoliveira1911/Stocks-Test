import { google } from 'googleapis'
import { useEffect } from 'react';
import { googleSpreadSheet } from 'google-spreadsheet'


export async function getServerSideProps({query}) {

    const auth = new google.auth.GoogleAuth({
        keyFile: "credentials.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets"
    });
    const sheets = google.sheets({version: 'v4' , auth})
    const {id} = query
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






export default function Post({rows, sheets}) {

   /*  async function createNewSheet(sheets) {
        let newSheet = await sheets.spreadsheet.create()
        

        return newSheet
    } */



    function calcProfit(data) {
        let profit = 0
        data.map((el) => {
            if (el[0] != "") { 
            let arrBeforeTreat = [...el[4]]
            let arrAfterTreat = [arrBeforeTreat[3], '.' ,arrBeforeTreat[5], arrBeforeTreat[6]]
            let val = parseFloat(arrAfterTreat.toString().replace(/,/g, ""))
            profit = val + profit
           // implementar soma com os numeros negativos. melhorar a conversão da string
           
        }      
    })
    return profit
    } 

    function renderData(data) {
        return data.map((el, index)=> {
            if (el[0] != "")
            return (
            <tr >
                <td key={index}>{el[0]}</td>
                <td key={index}>{el[1]}</td>
                <td key={index}>{el[2]}</td>
                <td key={index}>{el[3]}</td>
                <td key={index}>{el[4]}</td>
                <td key={index}>{el[5]}</td>
                <td key={index}>{el[6]}</td>
                <td key={index}>{el[7]}</td>
                <td key={index}>{el[8]}</td>
                <td key={index}>{el[9]}</td>
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
                        <td>{calcProfit(rows)}</td>
                    </tr>
                </tbody>
            </table>
            {/* <button onClick={createNewSheet(sheets)}></button> */}
        </div>
    )
}