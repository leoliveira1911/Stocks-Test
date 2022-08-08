import { NextApiRequest, NextApiResponse } from 'next'
import { google } from 'googleapis'
import credentials from '../../../../credentialsDrive.json'
import useAuth from '../../../data/hook/useAuth'


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
            console.error(e)
            return res.status(500).send({ message: e.message })
        }

}
}