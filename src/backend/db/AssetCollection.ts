import Asset from '../../core/asset/Asset'
import AssetRepo from '../../core/asset/AssetRepo'
import firebase from '../../firebase/config'
//import { getDatabase, ref, child, get } from "firebase/database";

export default class AssetCollection implements AssetRepo {


    #conversor = {
        toFirestore(asset: Asset) {
            return {
                acoes: asset.acoes,
                etf: asset.etf,
                fimobiliario: asset.fimobiliario,
                fmmercado: asset.fmmercado,
                facoes: asset.facoes,
                commodities: asset.commodities,

            }
        },
        fromFireStore(snapshot: firebase.firestore.QueryDocumentSnapshot, options: firebase.firestore.SnapshotOptions): Asset {
            const data = snapshot?.data(options)

            return new Asset(data.user , data.acoes, data.etf, data.fimobiliario, data.fmmercado, data.facoes , data.commodities)
        }
    }

    async save(asset: Asset): Promise<Asset> {
        if (!asset.id) {

            const doc = await this.collection().doc(asset.user).collection('assets').add({
                acoes: asset.acoes,
                etf: asset.etf,
                fimobiliario: asset.fimobiliario,
                fmmercado: asset.fmmercado,
                facoes: asset.facoes,
                commodities: asset.commodities,
            })

            return asset
        } else {
            console.log('ENTREI NO ELSE')

            const doc = await this.collection().doc(asset.user).collection('assets').doc(asset.id).set({
                acoes: asset.acoes,
                etf: asset.etf,
                fimobiliario: asset.fimobiliario,
                fmmercado: asset.fmmercado,
                facoes: asset.facoes,
                commodities: asset.commodities,
            })
            console.log(doc)
            return asset
        }
    }

    async delete(id, user): Promise<void> {
        console.log('FUNÇÃO DELETE CHAMADA')
        const dbRef = await (await firebase.firestore().collection('users').doc(user).collection('assets').doc(id).delete())
        return dbRef
    }

    async getAll(user): Promise<Asset[]> {
        let assets = []
        let info
        console.log('USER DENTRO DE GET ALL' + user)
        const dbRef = await (await firebase.firestore().collection('users').doc(user).collection('assets').get()).docs
        console.log(dbRef)


        dbRef.map((doc) => {
            console.log('DOC ' + doc.id)
            info = doc.data()
            console.log('INFO ' + info)
            assets.push(new Asset(user, info.acoes, info.etf, info.fimobiliario, info.fmmercado, info.facoes , info.commodities, doc.id))
        })
        console.log(assets)
        return assets
    }


    private collection() {
        return firebase.firestore().collection('users').withConverter(this.#conversor)
    }

}