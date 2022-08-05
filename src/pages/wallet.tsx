import { google } from 'googleapis'
import { FormEvent, useEffect, useState } from 'react'
import { setInterval } from 'timers';
import credentials from '../../credentialsDrive.json'
import Table from '../components/Table';
import Form from '../components/Form'
import useAuth from '../data/hook/useAuth';
import Button from '../components/Button';
import Layout from '../components/template/Layout';
import GoogleSpreadsheet from 'google-spreadsheet';

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



export default function Post({ rows }) {

    const [addStockForm, setAddStockForm] = useState('hide')
    const [updateRow, setUpdateRow] = useState(0)
    const [updateStockForm, setUpdateStockForm] = useState('hide')
    const [date, setDate] = useState('')
    const [company, setCompany] = useState('')
    const [ticker, setTicker] = useState('')
    const [buyPrice, setBuyPrice] = useState('')
    const [shares, setShares] = useState('')
    const [stocks, setStocks] = useState(rows)
    const [values, setValues] = useState<{ profitPercent, invested, current, absolute, rowCount }>()


    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(e)
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

        setAddStockForm('hide')
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

    const update = (e) => {
        updateStockForm === 'hide' ? setUpdateStockForm('show') : setUpdateStockForm('hide')
        setUpdateRow(e)

    }

    const updateStock = async (e: FormEvent<HTMLFormElement>, row) => {
        e.preventDefault()
        const form = {
            date,
            company,
            ticker,
            profitPercent: `=(G${row + 1}-F${row + 1})/G${row + 1}*(-1)`,
            profitAbsolute: `=(F${row + 1}-G${row + 1})*H${row + 1}`,
            price: `=GOOGLEFINANCE(C${row + 1})`,
            buyPrice,
            shares,
            investedValue: `=H${row + 1}*G${row + 1}`,
            current: `=H${row + 1}*F${row + 1}`,
            range: `A${row + 1}:J${row + 1}`
        }

        const response = await fetch('/api/submit', {
            method: 'PUT',
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
        setUpdateRow(0)
        setUpdateStockForm('hide')

        handleGet()

    }


    const del = async (e) => {

        const form = {
            range: `${e + 1}`
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

    function addStock() {
        addStockForm == 'hide' ? setAddStockForm('show') : setAddStockForm('hide')
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

    useEffect(() => {
        return () => {
            calcValues(rows)
            setInterval(() => {
                handleGet()
            }, 60000)
        }

    }, [])

    return (

        <div className={`
    
        `}>
            <Layout
                title='Carteira de Ações'
                subtitle='Gerencie sua carteira de ações'
            >

                <div className='flex flex-col justify-center items-center'>
                    <Table values={values} stocks={stocks} update={(e) => update(e)} del={(e) => del(e)}></Table>

                    <Button onClick={addStock} label='Adicionar Nova Ação'></Button>
                    {/*  <button onClick={addStock}>Adicionar Nova Ação</button> */}
                    <div className='flex'>

                        {addStockForm === 'show' ? (

                            <Form
                                action='Adicionar Nova Ação'
                                setBuyPrice={(e) => setBuyPrice(e)}
                                setCompany={(e) => setCompany(e)}
                                setDate={(e) => setDate(e)}
                                setTicker={(e) => setTicker(e)}
                                setShares={(e) => setShares(e)}
                                submit={(e) => handleSubmit(e)}

                            ></Form>
                        ) : (null)}

                        {updateStockForm === 'show' ? (

                            <Form
                                action='Atualizar Ação'
                                setBuyPrice={(e) => setBuyPrice(e)}
                                setCompany={(e) => setCompany(e)}
                                setDate={(e) => setDate(e)}
                                setTicker={(e) => setTicker(e)}
                                setShares={(e) => setShares(e)}
                                submit={(e) => updateStock(e, updateRow)}
                            ></Form>
                        ) : (null)}
                    </div>

                </div>



            </Layout>
        </div>
    )
}