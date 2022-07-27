const { GoogleSpreadsheet } = require('google-spreadsheet');
const credentials = require('../../credentialsDrive.json');
    async function getSpreadsheet(id) {
        const doc = new GoogleSpreadsheet(credentials.sheet_id)
        await doc.useServiceAccountAuth({
            client_email: credentials.client_email,
            private_key: credentials.private_key
          });
        await doc.loadInfo(); // loads document properties and worksheets
          console.log(doc.title);
          const sheet = await doc.sheetsByTitle[`${id}`]
          console.log(sheet.rowCount)
    }
    console.log(getSpreadsheet(1))

