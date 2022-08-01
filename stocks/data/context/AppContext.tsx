import {createContext} from 'react'

const AppContext = createContext({})

export function AppProvider(props) {

    return (
        <AppContext.Provider value={{
            nome: "Teste Context API"
        }} >


        </AppContext.Provider>
    )
}

export default AppContext
