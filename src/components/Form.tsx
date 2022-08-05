import { FormEvent, useEffect, useState } from "react"
import Button from './Button'

interface FormProps {
submit?:(e:FormEvent<HTMLFormElement>)=> void
action:string
setDate:(e)=>void
setCompany:(e)=>void
setTicker:(e)=>void
setBuyPrice:(e)=>void
setShares:(e)=>void
}

export default function Form (props: FormProps) {

    
    const [date, setDate] = useState('')
    const [company, setCompany] = useState('')
    const [ticker, setTicker] = useState('')
    const [buyPrice, setBuyPrice] = useState('')
    const [shares, setShares] = useState('')


    function resetValues(){
        
            setDate('')
            setCompany('')
            setTicker('')
            setBuyPrice('')
            setShares('')
        
    }

    return(
        <div>
                <h3 style={{ marginTop: '50px' }} >{props.action}</h3>
                 <form onSubmit={(e)=> props.submit(e)}>
                    <div>
                        <label htmlFor='date'> Data de compra</label>
                        <input required value={date} onChange={e => {props.setDate(e.target.value) ; setDate(e.target.value)}} type="text" name="date" id="date" />
                    </div>
                    <div>
                        <label htmlFor='company'> Empresa</label>
                        <input required value={company} onChange={e => {props.setCompany(e.target.value) ; setCompany(e.target.value)}} type="text" name="company" id="company" />
                    </div>
                    <div>
                        <label htmlFor='ticker'> Ticker </label>
                        <input required value={ticker} onChange={e => {props.setTicker(e.target.value) ; setTicker(e.target.value)}} type="text" name="ticker" id="ticker" />
                    </div>
                    <div>
                        <label htmlFor='buyPrice'> Preço de compra </label>
                        <input required value={buyPrice} onChange={e => {props.setBuyPrice(e.target.value) ; setBuyPrice(e.target.value)}} type="text" name="buyPrice" id="buyPrice" />
                    </div>
                    <div>
                        <label htmlFor='shares'> Número de ações </label>
                        <input required value={shares} onChange={e => {props.setShares(e.target.value) ; setShares(e.target.value)}} type="text" name="shares" id="shares" />
                    </div>
                    <div>
                        {/* <button type='submit' onClick={()=>resetValues}>Enviar</button> */}
                        <Button type='submit' onClick={()=>resetValues} label='Enviar'></Button>
                    </div>
                </form> 
                
            </div>
    )
}