import { google } from 'googleapis'
import { useEffect } from 'react';
import { GoogleSpreadsheet } from 'google-spreadsheet'
import credentials from '../../credentialsDrive.json'


export async function getServerSideProps({query}) {
    const {id} = query
    const doc = new GoogleSpreadsheet(credentials.sheet_id)
        await doc.useServiceAccountAuth({
            client_email: credentials.client_email,
            private_key: credentials.private_key
          });
        await doc.loadInfo(); // loads document properties and worksheets
          console.log(doc.title);
          const sheets = doc.sheetsByIndex; // or use doc.sheetsById[id] or doc.sheetsByTitle[title]         
          
          sheets.map((sheet) => {
            if (sheet.title === id) {
                let workingSheet = sheet
                console.log(sheet.title)
            }
          } )
    return {

}
}

export default function Post({workingSheet}) {

    console.log()

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
            </table>
            {/* <button onClick={createNewSheet(sheets)}></button> */}
        </div>
    )
}