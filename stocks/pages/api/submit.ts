import { NextApiRequest , NextApiResponse } from 'next'
import {google} from 'googleapis'


type SheetForm = {
    name: string
    teste: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if(req.method !== 'POST') {
        return res.status(405).send({message:'Only POST requests are allowed'})
    }

    const body = req.body as SheetForm

    try {

        const auth = new google.auth.GoogleAuth({
            keyFile: 'credentialsDrive.json',
            scopes:  [
                "https://www.googleapis.com/auth/drive",
                "https://www.googleapis.com/auth/drive.file",
                "https://www.googleapis.com/auth/spreadsheets",
            ]
        });
        const sheets = google.sheets({ version: 'v4', auth })
        
        const range = `A1:B1`
        const response = await sheets.spreadsheets.values.append({
            spreadsheetId: process.env.SHEET_ID,
            range,
            valueInputOption: 'USER_ENTERED',
            requestBody: {
                values: [
                    [body.name , body.teste] 
                ]
            }
        })

        return res.status(200).json({
            data:response.data
        })

    } catch(e) {
        console.error(e)
        return res.status(500).send({message: e.message})
    }


}