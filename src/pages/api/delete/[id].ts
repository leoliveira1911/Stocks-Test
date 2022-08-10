import { NextApiRequest, NextApiResponse } from 'next'
import { google } from 'googleapis'
import credentials from '../../../../credentialsDrive.json'



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
{try {
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
    const {id} = req.query
    const sheets = google.sheets({ version: 'v4', auth })
    const getSheetId = await sheets.spreadsheets.get({
        spreadsheetId: credentials.sheet_id
    })
    let sheetId 
    getSheetId.data.sheets?.map(sheet => {
        if (sheet.properties?.title == id){
            sheetId = sheet.properties?.sheetId
        }
    })

    const response = await sheets.spreadsheets.batchUpdate({
        spreadsheetId: credentials.sheet_id,
        requestBody: {
            "requests" : [
                {
                    "deleteRange": {
                        'range': {
                            'startRowIndex': range-1,
                            'endRowIndex': range,
                            'sheetId': sheetId
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