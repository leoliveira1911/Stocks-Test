import { NextApiRequest, NextApiResponse } from 'next'
import { google } from 'googleapis'



//DATA	COMPANY	TICKER	PROFIT_PERCENT	PROFIT_ABSOLUTE	PRICE	BUY_PRICE	SHARES	INVESTED_VALUE	CURRENT
type SheetForm = {
    date: string
    company: string
    ticker: string
    profitPercent: string
    profitAbsolute: string
    price: string
    buyPrice: number
    shares: number
    investedValue: string
    current: string
    type: string
    range: any
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
)  
{

    
    if (req.method === 'POST') {
        const body = req.body as SheetForm
        
        try {
            const scopes = [
                "https://www.googleapis.com/auth/drive",
                "https://www.googleapis.com/auth/drive.file",
                "https://www.googleapis.com/auth/spreadsheets",
            ]
            const client = new google.auth.JWT(
                process.env.NEXT_PUBLIC_CLIENT_EMAIL,
                null,
                process.env.NEXT_PUBLIC_JWT_PRIVATE_KEY.replace(/\\n/gm, '\n'),
                scopes,  
            );
            const sheets = google.sheets({ version: 'v4', auth:client })
            const {id} = req.query
            const range = `${id}!A1:K1`
            const response = await sheets.spreadsheets.values.append({
                spreadsheetId: process.env.NEXT_PUBLIC_SHEET_ID,
                range,
                valueInputOption: 'USER_ENTERED',
                requestBody: {
                    //DATA	COMPANY	TICKER	PROFIT_PERCENT	PROFIT_ABSOLUTE	PRICE	BUY_PRICE	SHARES	INVESTED_VALUE	CURRENT
                    values: [
                        [body.date, body.company, body.ticker, body.profitPercent, body.profitAbsolute, body.price, body.buyPrice, body.shares, body.investedValue, body.current, body.type]
                    ]
                }
            })

            return res.status(200).json({
                data: response.data
            })

        } catch (e) {
            console.error(e)
            return res.status(500).send({ message: e.message })
        }}}