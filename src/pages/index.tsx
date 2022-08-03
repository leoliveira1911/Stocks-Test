import { google } from 'googleapis'
import { factchecktools } from 'googleapis/build/src/apis/factchecktools';
import { useRouter } from 'next/router';
import { Component, FormEvent, useEffect, useState } from 'react'
import { setInterval } from 'timers';
import credentials from '../../credentialsDrive.json'
import Table from '../components/Table';



export async function getServerSideProps() {

    const auth = new google.auth.GoogleAuth({
        keyFile: "credentialsDrive.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets"
    });

    const sheets = google.sheets({ version: 'v4', auth })
    
    const range = `1!A:J`

    const response = await sheets.spreadsheets.values.get({
        spreadsheetId: credentials.sheet_id,
        range
    })

    const rows = response.data.values

    return {
        props: {
            rows,
        }
    }

}



export default function Post({ rows}) {
 
    const [date, setDate] = useState('')
    const [company, setCompany] = useState('')
    const [ticker, setTicker] = useState('')
    const [buyPrice, setBuyPrice] = useState('')
    const [shares, setShares] = useState('')
    const [stocks, setStocks] = useState(rows)
    const [values, setValues] = useState<{profitPercent, invested, current, absolute, rowCount}>()

   
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        //DATA	COMPANY	TICKER	PROFIT_PERCENT	PROFIT_ABSOLUTE	PRICE	BUY_PRICE	SHARES	INVESTED_VALUE	CURRENT
        const form = {
            date,
            company,
            ticker,
            profitPercent: `=(G${values.rowCount + 2}-F${values.rowCount + 2})/G${values.rowCount + 2}*(-1)`,
            profitAbsolute: `=(F${values.rowCount + 2}-G${values.rowCount + 2})*H${values.rowCount + 2}`,
            price: `=GOOGLEFINANCE(C${values.rowCount + 2})`,
            buyPrice,
            shares,
            investedValue: `=H${values.rowCount + 2}*G${values.rowCount + 2}`,
            current: `=H${values.rowCount + 2}*F${values.rowCount + 2}`
        }

        const response = await fetch('/api/submit', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(form)
        })

        const content = await response.json()

        alert(content)

        setDate('')
        setCompany('')
        setTicker('')
        setBuyPrice('')
        setShares('')

        handleGet()
    }
    
    const handleGet = async () => {
        
        const response = await fetch('/api/submit', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })

        const content = await response.json()
        const stock = await content.data
              
        setStocks(stock)
        calcValues(stock)

    }
    
    const update = async  (e) => {
        
        const form = {
            date,
            company,
            ticker,
            profitPercent: `=(G${e+1}-F${e+1})/G${e+1}*(-1)`,
            profitAbsolute: `=(F${e+1}-G${e+1})*H${e+1}`,
            price: `=GOOGLEFINANCE(C${e+1})`,
            buyPrice,
            shares,
            investedValue: `=H${e+1}*G${e+1}`,
            current: `=H${e+1}*F${e+1}`,
            range: `A${e+1}:J${e+1}`
        }

        const response = await fetch('/api/submit', {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(form)
        })

        const content = await response

        alert(content)

        setDate('')
        setCompany('')
        setTicker('')
        setBuyPrice('')
        setShares('')

        handleGet()

    }

   
    const del = async  (e) => {
        
        const form = {
            range: `${e+1}`
        }

        const response = await fetch('/api/submit', {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(form)
        })

        const content = await response

        alert(content)

        setDate('')
        setCompany('')
        setTicker('')
        setBuyPrice('')
        setShares('')

        handleGet()

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
            invested: invested.toFixed(2),
            current: current.toFixed(2),
            absolute,
            rowCount
        }
        setValues(values)
    }
  
    useEffect(()=>{
        return  ()=>{
            calcValues(rows)
            setInterval(()=>{
                handleGet()
            }, 60000)
        }

    } , [] )

    return (
        <div>
            <Table values={values} stocks={stocks} update={(e)=>update(e)} del={(e)=>del(e)}></Table>
            <div>
                <h3 style={{ marginTop: '50px' }} >Adicionar nova ação:</h3>
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