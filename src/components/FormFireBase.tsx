import { FormEvent, useEffect, useState } from "react"
import Button from './Button'

interface FormProps {
submit?:()=> void
action:string
setDate:(e)=>void
setCompany:(e)=>void
setTicker:(e)=>void
setBuyPrice:(e)=>void
setShares:(e)=>void
setCommodities:(e)=>void
}

export default function Form (props: FormProps) {

    
    const [date, setDate] = useState('')
    const [company, setCompany] = useState('')
    const [ticker, setTicker] = useState('')
    const [buyPrice, setBuyPrice] = useState('')
    const [shares, setShares] = useState('')
    const [commodities, setCommodities] = useState('')


    function resetValues(){
        
            setDate('')
            setCompany('')
            setTicker('')
            setBuyPrice('')
            setShares('')
            setCommodities('')
        
    }

    return(
        <div className={`
        flex flex-col items-center justify-center m-2 p-3 rounded-2xl overflow-hidden
        bg-gray-200 dark:text-gray-200 dark:bg-gray-900 
        `}>
                <h3 className={`
                         p-1 font-bold text-xl
                    `} >{props.action}</h3>
                 <form>
                    <div className={`
                        flex flex-col p-1 font-semibold
                    `}>
                        <label htmlFor='date'> Ações </label>
                        <input placeholder="123" className={`text-black rounded-md px-2 py-1`} value={date} onChange={e => {props.setDate(e.target.value) ; setDate(e.target.value)}} type="text" name="date" id="date" />
                    </div>
                    <div className={`
                        flex flex-col p-1 font-semibold
                    `}>
                        <label htmlFor='company'> ETF </label>
                        <input placeholder="123" className={`text-black rounded-md px-2 py-1`} required value={company} onChange={e => {props.setCompany(e.target.value) ; setCompany(e.target.value)}} type="text" name="company" id="company" />
                    </div>
                    <div className={`
                        flex flex-col p-1 font-semibold
                    `}>
                        <label htmlFor='ticker'> Fundo Imobiliário </label>
                        <input placeholder="123" className={`text-black rounded-md px-2 py-1`} required value={ticker} onChange={e => {props.setTicker(e.target.value) ; setTicker(e.target.value)}} type="text" name="ticker" id="ticker" />
                    </div>
                    <div className={`
                        flex flex-col p-1 font-semibold
                    `}>
                        <label htmlFor='buyPrice'> Fundo Multi Mercado </label>
                        <input placeholder="123" className={`text-black rounded-md px-2 py-1`}  value={buyPrice} onChange={e => {props.setBuyPrice(e.target.value) ; setBuyPrice(e.target.value)}} type="text" name="buyPrice" id="buyPrice" />
                    </div>
                    <div className={`
                        flex flex-col p-1 font-semibold
                    `}>
                        <label htmlFor='shares'> Fundo de Ações </label>
                        <input placeholder="123" className={`text-black rounded-md px-2 py-1`}  value={shares} onChange={e => {props.setShares(e.target.value) ; setShares(e.target.value)}} type="text" name="shares" id="shares" />
                    </div>
                    <div className={`
                        flex flex-col p-1 font-semibold
                    `}>
                        <label htmlFor='shares'> Commodities </label>
                        <input placeholder="123" className={`text-black rounded-md px-2 py-1`}  value={commodities} onChange={e => {props.setCommodities(e.target.value) ; setCommodities(e.target.value)}} type="text" name="shares" id="shares" />
                    </div>
                    <div className={`
                    flex justify-center
                    `}>
                        {/* <button type='submit' onClick={()=>resetValues}>Enviar</button> */}
                        <Button type="button" onClick={()=>{props.submit() ; resetValues() }} label='Enviar'></Button>
                    </div>
                </form> 
                
            </div>
    )
}