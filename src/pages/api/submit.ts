import { NextApiRequest, NextApiResponse } from 'next'
import { google } from 'googleapis'
//import credentials from '../../../credentialsDrive.json'



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

            const auth = new google.auth.GoogleAuth({
                keyFile: 'credentialsDrive.json',
                scopes: [
                    "https://www.googleapis.com/auth/drive",
                    "https://www.googleapis.com/auth/drive.file",
                    "https://www.googleapis.com/auth/spreadsheets",
                ]
            });
            const sheets = google.sheets({ version: 'v4', auth })

            const range = `A1:J1`
            const response = await sheets.spreadsheets.values.append({
                spreadsheetId: credentials.sheet_id,
                range,
                valueInputOption: 'USER_ENTERED',
                requestBody: {
                    //DATA	COMPANY	TICKER	PROFIT_PERCENT	PROFIT_ABSOLUTE	PRICE	BUY_PRICE	SHARES	INVESTED_VALUE	CURRENT
                    values: [
                        [body.date, body.company, body.ticker, body.profitPercent, body.profitAbsolute, body.price, body.buyPrice, body.shares, body.investedValue, body.current]
                    ]
                }
            })

            return res.status(200).json({
                data: response.data
            })

        } catch (e) {
            console.error(e)
            return res.status(500).send({ message: e.message })
        }
    } else if (req.method === 'GET') {
        try {

            const auth = new google.auth.GoogleAuth({
                keyFile: "credentialsDrive.json",
                scopes: [
                    "https://www.googleapis.com/auth/drive",
                    "https://www.googleapis.com/auth/drive.file",
                    "https://www.googleapis.com/auth/spreadsheets",
                ]
            });
            const sheets = google.sheets({ version: 'v4', auth })
            const id = 1
            const range = `${id}!A:J`
            const response = await sheets.spreadsheets.values.get({
                spreadsheetId: credentials.sheet_id,
                range
            }) 
            
            const rows = response.data.values
            
            return res.status(200).json({
                data: rows
            })
        }
        catch (e) {
            console.error(e)
            return res.status(500).send({ message: e.message })
        }
    } else if (req.method === 'PUT') {
        try {
            const body = req.body as SheetForm
            const auth = new google.auth.GoogleAuth({
                keyFile: "credentialsDrive.json",
                scopes: [
                    "https://www.googleapis.com/auth/drive",
                    "https://www.googleapis.com/auth/drive.file",
                    "https://www.googleapis.com/auth/spreadsheets",
                ]
            });
            const range = body.range

            const sheets = google.sheets({ version: 'v4', auth })


            const response = await sheets.spreadsheets.values.update({
                spreadsheetId: credentials.sheet_id,
                range,
                valueInputOption: 'USER_ENTERED',
                requestBody: {
                    //DATA	COMPANY	TICKER	PROFIT_PERCENT	PROFIT_ABSOLUTE	PRICE	BUY_PRICE	SHARES	INVESTED_VALUE	CURRENT
                    values: [
                        [body.date, body.company, body.ticker, body.profitPercent, body.profitAbsolute, body.price, body.buyPrice, body.shares, body.investedValue, body.current]
                    ]
                }
            })

            return res.status(200).json({
                data: response.data
            })
        }
        catch (e) {
            console.error(e)
            return res.status(500).send({ message: e.message })
        }
    } else if (req.method === 'DELETE') {
        try {
            const body = req.body as SheetForm
            const auth = new google.auth.GoogleAuth({
                keyFile: "credentialsDrive.json",
                scopes: [
                    "https://www.googleapis.com/auth/drive",
                    "https://www.googleapis.com/auth/drive.file",
                    "https://www.googleapis.com/auth/spreadsheets",
                ]
            });
            const range = body.range

            const sheets = google.sheets({ version: 'v4', auth })

            const response = await sheets.spreadsheets.batchUpdate({
                spreadsheetId: credentials.sheet_id,
                requestBody: {
                    "requests" : [
                        {
                            "deleteRange": {
                                'range': {
                                    'startRowIndex': range-1,
                                    'endRowIndex': range,
                                    'sheetId': 634260036
                                },
                                'shiftDimension': 'ROWS'
                            }
                        }
                    ]
                }
            })

            return res.status(200).json({
                data: response.data
            })
        }
        catch (e) {
            console.error(e)
            return res.status(500).send({ message: e.message })
        }
    }
}