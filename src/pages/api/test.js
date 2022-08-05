

const credentials = require('../../../credentialsDrive.json')



const { GoogleSpreadsheet } = require('google-spreadsheet');

// spreadsheet key is the long id in the sheets URL
const doc = new GoogleSpreadsheet(credentials.sheet_id);

async function accessSpreadsheet() {
  await doc.useServiceAccountAuth({
    client_email: credentials.client_email,
    private_key: credentials.private_key,
  });

  await doc.loadInfo(); // loads document properties and worksheets
  console.log(doc.title);
    let sheet = await doc.sheetsByTitle['1']

    
    if (!sheet){
        sheet = await doc.addSheet(
            {
                title:'1',
                headerValues: ['DATA',	'EMPRESA',	'TICKER	%',	'LUCRO/PREJUIZO',	'COTAÇÃO'	,'PREÇO BUY'	,'AÇÕES',	'VALOR' ,'INVESTIDO'	,'SALDO ATUAL'],
            
            }
        )
    }
    const rows = await sheet.getRows()
    const rowsData = []
    rows.map(row => rowsData.push(row._rawData))
 console.log(rowsData)
 console.log(sheet._rawProperties.sheetId)
}

accessSpreadsheet();