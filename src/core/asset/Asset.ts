export default class Asset {
    #id: string
    #acoes: number
    #etf: number
    #fmmercado: number
    #facoes: number
    #commodities: number
    #fimobiliario: number
    #user: string

    constructor(user:string , acoes: number , etf: number, fimobiliario:number , fmmercado:number , facoes:number , commodities: number, id: string = 'AssetAllocation') {
        this.#user = user
        this.#acoes = acoes
        this.#etf = etf
        this.#fimobiliario = fimobiliario
        this.#fmmercado = fmmercado 
        this.#facoes = facoes 
        this.#commodities = commodities 
        this.#id = id
    }

    static empty() {
        return new Asset('',0,0,0,0,0,0)
    }

    get id() {
        return this.#id
    }

    get user() {
        return this.#user
    }

    get acoes() {
        return this.#acoes
    }

    get etf() {
        return this.#etf
    }

    get fimobiliario() {
        return this.#fimobiliario
    }

    get fmmercado() {
        return this.#fmmercado
    }

    get facoes() {
        return this.#facoes
    }

    get commodities() {
        return this.#commodities
    }

} 