import { NextApiRequest, NextApiResponse } from 'next'
import { google } from 'googleapis'
import credentials from '../../../../credentialsDrive.json'
import useAuth from '../../../data/hook/useAuth'
import { title } from 'process'


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

            const auth = new google.auth.GoogleAuth({
                keyFile: "credentialsDrive.json",
                scopes: [
                    "https://www.googleapis.com/auth/drive",
                    "https://www.googleapis.com/auth/drive.file",
                    "https://www.googleapis.com/auth/spreadsheets",
                ]
            });

            const sheets = google.sheets({ version: 'v4', auth })
            const {id} = req.query
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
            const auth = new google.auth.GoogleAuth({
                keyFile: "credentialsDrive.json",
                scopes: [
                    "https://www.googleapis.com/auth/drive",
                    "https://www.googleapis.com/auth/drive.file",
                    "https://www.googleapis.com/auth/spreadsheets",
                ]
            });

            const sheets = google.sheets({ version: 'v4', auth })
            const {id} = req.query
            const response = await sheets.spreadsheets.batchUpdate({
                spreadsheetId: credentials.sheet_id,
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
                spreadsheetId: credentials.sheet_id,
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
