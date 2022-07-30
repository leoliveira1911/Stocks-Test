import {FormEvent, useState} from 'react'

export default function Form() {

    const [date, setDate] = useState('')
    const [company, setCompany] = useState('')
    const [ticker, setTicker] = useState('')
    const [buyPrice, setBuyPrice] = useState('')
    const [shares, setShares] = useState('')

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();


        //DATA	COMPANY	TICKER	PROFIT_PERCENT	PROFIT_ABSOLUTE	PRICE	BUY_PRICE	SHARES	INVESTED_VALUE	CURRENT


        const form = {
            date,
            company,
            ticker,
            profitPercent: null,
            profitAbsolute: null,
            price: null,
            buyPrice,
            shares,
            investedValue: null,
            current: null
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
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='date'> Data de compra</label>
                    <input value={date} onChange={e => setDate(e.target.value)} type="text" name="date" id="date" />
                </div>
                <div>
                    <label htmlFor='company'> Empresa</label>
                    <input value={company} onChange={e => setCompany(e.target.value)} type="text" name="company" id="company" />
                </div>
                <div>
                    <label htmlFor='ticker'> Ticker </label>
                    <input value={ticker} onChange={e => setTicker(e.target.value)} type="text" name="ticker" id="ticker" />
                </div>
                <div>
                    <label htmlFor='buyPrice'> Preço de compra </label>
                    <input value={buyPrice} onChange={e => setBuyPrice(e.target.value)} type="text" name="buyPrice" id="buyPrice" />
                </div>
                <div>
                    <label htmlFor='shares'> Número de ações </label>
                    <input value={shares} onChange={e => setShares(e.target.value)} type="text" name="shares" id="shares" />
                </div>
                <div>
                    <button type='submit'>Enviar</button>
                    
                </div>
            </form>
        </div>
    )
}