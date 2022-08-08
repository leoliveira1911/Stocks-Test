//import userId from './api/test.js'

import { useEffect } from "react"

export default function Teste() {

  const handleGet = async () => {

    const response = await fetch('/api/test', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    })

    const content = await response.json()
    content.data.sheets.forEach(sheet => {
      const sheetId = sheet.properties.sheetId
      const sheetTitle = sheet.properties.title
      console.log(`O título é ${sheetTitle} e o ID é ${sheetId}`)
    })
    //console.log(content.data.sheets)
}
  useEffect(()=>{
    return () => {handleGet()}
  }, [])
  
    return <h1>{'oi'}</h1>
}