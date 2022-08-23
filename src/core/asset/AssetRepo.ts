import Asset from './Asset'

export default interface AssetRepo {
    save(asset: Asset) : Promise<Asset>
    delete(asset: Asset , user: string) : Promise<void>
    getAll(user) : Promise<Asset[]>
} 