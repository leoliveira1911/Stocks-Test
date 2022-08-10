import { NextApiRequest, NextApiResponse } from 'next'
import { google } from 'googleapis'
//import credentials from '../../../../credentialsDrive.json'


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
  uid: any
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {


  if (req.method === 'GET') {
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
            const range = `${id}!A:J`
            const response = await sheets.spreadsheets.values.get({
                spreadsheetId: process.env.NEXT_PUBLIC_SHEET_ID,
                range
            }) 
            
            
            const rows = response.data.values 
            
            return res.status(200).json({
                data: rows
            })
        }
        catch (e) {
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

            const response = await sheets.spreadsheets.batchUpdate({
                spreadsheetId: process.env.NEXT_PUBLIC_SHEET_ID,
                requestBody: {
                    "requests" : [
                        {
                            "addSheet": {
                              "properties": {
                                "index":0,
                                "title": `${id}`,                                
                                "gridProperties": {
                                  "rowCount": 1000,
                                  "columnCount": 10,
                                  
                                },
                                
                              }
                            
                            }                            
                          }
                    ]
                }
            })
            
            const values = await sheets.spreadsheets.values.update({
                spreadsheetId: process.env.NEXT_PUBLIC_SHEET_ID,
                range:`${id}!A1:J1`,
                valueInputOption: 'USER_ENTERED',
                requestBody: {
                    //DATA	COMPANY	TICKER	PROFIT_PERCENT	PROFIT_ABSOLUTE	PRICE	BUY_PRICE	SHARES	INVESTED_VALUE	CURRENT
                    values: [
                        ['DATE', 'COMPANY', 'TICKER', 'PROFITPERCENT', 'PROFIT ABSOLUTE', 'PRICE', 'BUYPRICE', 'SHARES', 'INVESTEDVALUE', 'CURRENT']
                    ]
    
                }
            })
            const rows = values.data
               
                return res.status(200).json({
                    data: rows
                })
            }
            
        }

}
