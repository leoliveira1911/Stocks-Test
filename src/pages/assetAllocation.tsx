import Layout from '../components/template/Layout'
import FormFireBase from '../components/FormFireBase'
import { useEffect, useState } from "react"
import Asset from '../core/asset/Asset'
import AssetRepo from '../core/asset/AssetRepo'
import AssetCollection from '../backend/db/AssetCollection'
import useAuth from '../data/hook/useAuth'
import Button from '../components/Button'
import TabelaFireBase from '../components/TableFireBase'



export default function Settings() {
  const auth = useAuth()
  const user = auth.user?.uid

  const repo: AssetRepo = new AssetCollection()
  const [acoes, setAcoes] = useState(0)
  const [etf, setEtf] = useState(0)
  const [id, setId] = useState('')
  const [fimobiliario, setFimobiliario] = useState(0)
  const [fmmercado, setFmmercado] = useState(0)
  const [facoes, setFacoes] = useState(0)
  const [commodities, setCommodities] = useState(0)
  const [stocks, setStocks] = useState()
  const [asset, setAsset] = useState<Asset>(Asset.empty())
  //const [user , setUser] = useState(auth.user ? auth.user.uid : '')  
  const [assets, setAssets] = useState<Asset[]>([])
  const [addStock, setAddStock] = useState('hide')
  const [updateStock, setUpdateStock] = useState('hide')

  /* acoes: asset.acoes,
                etf: asset.etf,
                fimobiliario: asset.fimobiliario,
                fmmercado: asset.fmmercado,
                facoes: asset.facoes,
                commodities: asset.commodities, */
  
     useEffect (() => {
      if(user) {
        getAll()
        handleGet()
      } 
  }, [auth.user])
    
     function getAll(){
      repo.getAll(user).then(assets => {
        setAssets(assets)
        console.log(assets)
        setAcoes(0)
        setEtf(0)
        setFimobiliario(0)
        setFacoes(0)
        setFmmercado(0)
        
        console.log('getAll chamada')
      })
  
    } 
  
    async function deleteAsset(id , user) {
      await repo.delete(id , user)
      getAll()
      
    }
  
    async function saveAsset(asset: Asset) {
      console.log('teste')
      await repo.save(asset)
      setAddStock('hide')
      setUpdateStock('hide')
      getAll()
  
    }

    function updateAsset(id) {
      setUpdateStock(`${updateStock == 'hide' ? 'show' : 'hide'}`)
      setAddStock('hide')
      setId(id)
    }

    const handleGet = async () => {

      const response = await fetch(`/api/get/${user}`, {
          method: 'GET',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
          },
      })

      const content = await response.json()
      //console.log(content)
      const stock = await content.data

      setStocks(stock)
      console.log(stock)
      calcValues(stock)

  }
  const calcValues = (data) => {
    let acao = 0
    let fii = 0
    let etf = 0
    let fmmercado = 0
    let facao = 0
    let commodities = 0
    if(data){
      data?.map((el) => {
        if (el[0] != "" && el[0] != 'DATE') {
            if(el[10]=='acao') {
              let stringInvestedBeforeTreat = el[9]
              let stringInvestedAfterTreat = stringInvestedBeforeTreat.replace('R$', '').replace('.', '').replace(',', '.').replace(' ', '')
              let val = parseFloat(stringInvestedAfterTreat)
              acao = acao + val
              setAcoes(acao)
            } else if(el[10] =='etf'){
              let stringInvestedBeforeTreat = el[9]
              let stringInvestedAfterTreat = stringInvestedBeforeTreat.replace('R$', '').replace('.', '').replace(',', '.').replace(' ', '')
              let val = parseFloat(stringInvestedAfterTreat)
              etf = etf + val
              setEtf(etf)
            } else if(el[10] =='fii'){
              let stringInvestedBeforeTreat = el[9]
              let stringInvestedAfterTreat = stringInvestedBeforeTreat.replace('R$', '').replace('.', '').replace(',', '.').replace(' ', '')
              let val = parseFloat(stringInvestedAfterTreat)
              fii = fii + val
              setFimobiliario(fii)
            } else if(el[10] =='fmmercado'){
              let stringInvestedBeforeTreat = el[9]
              let stringInvestedAfterTreat = stringInvestedBeforeTreat.replace('R$', '').replace('.', '').replace(',', '.').replace(' ', '')
              let val = parseFloat(stringInvestedAfterTreat)
              fmmercado = fmmercado + val
              setFmmercado(fmmercado)
            } else if(el[10] =='facao'){
              let stringInvestedBeforeTreat = el[9]
              let stringInvestedAfterTreat = stringInvestedBeforeTreat.replace('R$', '').replace('.', '').replace(',', '.').replace(' ', '')
              let val = parseFloat(stringInvestedAfterTreat)
              facao = facao + val
              setFacoes(facao)
            } else if(el[10] =='commodities'){
              let stringInvestedBeforeTreat = el[9]
              let stringInvestedAfterTreat = stringInvestedBeforeTreat.replace('R$', '').replace('.', '').replace(',', '.').replace(' ', '')
              let val = parseFloat(stringInvestedAfterTreat)
              commodities = commodities + val
              setCommodities(commodities)
            }
        }
    })

    }
  }

  
  return (
    <div className={`
    
    `}>
      <Layout 
        title='Asset Allocation'
        subtitle='Defina o Asset Allocation da sua carteira e acompanhe a distribuição do seu capital'
      >
    
        <TabelaFireBase assetAllocation={assets} stocks={[acoes,etf ,fimobiliario , fmmercado, facoes , commodities]} />
        <div className={`
        flex justify-center items-center flex-col
        `} >
        <Button label={'Definir Asset Allocation'} onClick={()=> {setAddStock(`${addStock == 'hide' ? 'show' : 'hide'}`) ; setUpdateStock('hide')} } />

        {addStock == 'show' ? (
          <FormFireBase action='Asset Allocation' submit={()=> saveAsset(new Asset(user, acoes, etf, fimobiliario, fmmercado, facoes, commodities))} setBuyPrice={setFmmercado} setCompany={setEtf} setDate={setAcoes} setShares={setFacoes} setTicker={setFimobiliario} setCommodities={setCommodities} />
          
          ) : (null)}
        </div>

        
        
      </Layout>
    </div>
  )
}