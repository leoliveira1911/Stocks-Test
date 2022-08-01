import { google } from 'googleapis'
import { useRouter } from 'next/router';
import {FormEvent, useState } from 'react'



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
    const router = useRouter()
    const [date, setDate] = useState('')
    const [company, setCompany] = useState('')
    const [ticker, setTicker] = useState('')
    const [buyPrice, setBuyPrice] = useState('')
    const [shares, setShares] = useState('')

   const refreshData = () => {
        router.replace(router.asPath);
      }
    
  
  
  
  


    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        //DATA	COMPANY	TICKER	PROFIT_PERCENT	PROFIT_ABSOLUTE	PRICE	BUY_PRICE	SHARES	INVESTED_VALUE	CURRENT
        const form = {
            date,
            company,
            ticker,
            profitPercent: `=(G${calcValues(rows).rowCount + 2}-F${calcValues(rows).rowCount + 2})/G${calcValues(rows).rowCount + 2}*(-1)`,
            profitAbsolute: `=(F${calcValues(rows).rowCount + 2}-G${calcValues(rows).rowCount + 2})*H${calcValues(rows).rowCount + 2}`,
            price: `=GOOGLEFINANCE(C${calcValues(rows).rowCount + 2})`,
            buyPrice,
            shares,
            investedValue: `=H${calcValues(rows).rowCount + 2}*G${calcValues(rows).rowCount + 2}`,
            current: `=H${calcValues(rows).rowCount + 2}*F${calcValues(rows).rowCount + 2}`
        }

        const response = await fetch('/api/submit' , {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            } ,
            body: JSON.stringify(form)
        })

        const content = await response.json()

        alert(content)
        
        setDate('')
        setCompany('')
        setTicker('')
        setBuyPrice('')
        setShares('')
        
        refreshData()
    }




    function calcValues(data) {
        let invested = 0
        let current = 0
        let rowCount = 0
        data.map((el) => {
            if (el[0] != "" && el[0] != 'DATA') {
                let stringInvestedBeforeTreat = el[8]
                let stringInvestedAfterTreat = stringInvestedBeforeTreat.replace('R$', '').replace('.', '').replace(',', '.').replace(' ', '')
                let valueInvested = parseFloat(stringInvestedAfterTreat)
                invested = invested + valueInvested

                let stringCurrentBeforeTreat = el[9]
                let stringCurrentAfterTreat = stringCurrentBeforeTreat.replace('R$', '').replace('.', '').replace(',', '.').replace(' ', '')
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
            <h2>Valor da carteira : R$ {calcValues(rows).current}</h2>
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
                        <td>R$ {calcValues(rows).absolute}</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>{calcValues(rows).invested}</td>
                        <td>{calcValues(rows).current}</td>
                    </tr>
                </tbody>
            </table>
            <div>
            </div>
            <div>
            <h3 style={{marginTop: '50px'}} >Adicionar nova ação:</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='date'> Data de compra</label>
                    <input required value={date} onChange={e => setDate(e.target.value)} type="text" name="date" id="date" />
                </div>
                <div>
                    <label htmlFor='company'> Empresa</label>
                    <input required value={company} onChange={e => setCompany(e.target.value)} type="text" name="company" id="company" />
                </div>
                <div>
                    <label htmlFor='ticker'> Ticker </label>
                    <input required value={ticker} onChange={e => setTicker(e.target.value)} type="text" name="ticker" id="ticker" />
                </div>
                <div>
                    <label htmlFor='buyPrice'> Preço de compra </label>
                    <input required value={buyPrice} onChange={e => setBuyPrice(e.target.value)} type="text" name="buyPrice" id="buyPrice" />
                </div>
                <div>
                    <label htmlFor='shares'> Número de ações </label>
                    <input required value={shares} onChange={e => setShares(e.target.value)} type="text" name="shares" id="shares" />
                </div>
                <div>
                    <button type='submit'>Enviar</button>
                    
                </div>
            </form>
        </div>
        </div>
    )
}