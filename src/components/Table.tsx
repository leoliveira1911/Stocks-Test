import { EditIcon, DeleteIcon } from '../icons'


interface TableProps {
    stocks: any[][],
    values: {
        profitPercent,
        invested,
        current,
        absolute,
        rowCount
    },
    update: (e) => void
    del: (e) => void
}


export default function Table(props: TableProps) {
    function renderData(data) {
        return data.map((el, index) => {
            if (el[0] != "" && index > 0)
                return (
                    <tr key={index} className={`
                    ${index % 2 === 0 ? 'bg-gray-900' : 'bg-gray-600'}
                    `}>
                        <td className={`text-center px-3`} >{el[0]}</td>
                        <td className={`text-center px-3`} >{el[1]}</td>
                        <td className={`text-center px-3`} >{el[2]}</td>
                        <td className={`text-center px-3`} >{el[3]}</td>
                        <td className={`text-center px-3`} >{el[4]}</td>
                        <td className={`text-center px-3`} >{el[5]}</td>
                        <td className={`text-center px-3`} >{el[6]}</td>
                        <td className={`text-center px-3`} >{el[7]}</td>
                        <td className={`text-center px-3`} >{el[8]}</td>
                        <td className={`text-center px-3`} >{el[9]}</td>
                        <td className={`text-center px-3`}>
                            <div onClick={() => props.update(index)} className={`
                     flex 
                     justify-center 
                     items-center
                     text-green-600
                     rounded-full
                     p-2
                     m-1
                     hover:bg-purple-50
                     `}>
                                {EditIcon}
                            </div>
                            <div onClick={() => props.del(index)} className={`
                     flex 
                     justify-center 
                     items-center
                     text-red-600
                     rounded-full
                     p-2
                     m-1
                     hover:bg-purple-50
                     `}>
                                {DeleteIcon}
                            </div>
                        </td>
                    </tr>
                )
        })
    }

    return (
        <div className={`
        flex flex-col justify-center items-center
        `}>
            <h1>Shares</h1>
            <h2>Valor da carteira : R$ {props.values?.current}</h2>
            <table className={`rounded-xl overflow-hidden`}>
                <thead className={`bg-gray-900 py-2`}>
                    <tr>
                        <th className={`p-3`} >Data de Compra </th>
                        <th className={`p-3`} >Empresa </th>
                        <th className={`p-3`} >Ticker </th>
                        <th className={`p-3`} >Lucro % </th>
                        <th className={`p-3`} >Lucro Bruto </th>
                        <th className={`p-3`} >Cotação atual </th>
                        <th className={`p-3`} >Preço de compra </th>
                        <th className={`p-3`} >Numero de Ações </th>
                        <th className={`p-3`} >Valor Investido </th>
                        <th className={`p-3`} >Saldo Atual </th>
                        <th className={`p-3 `}>Ação </th>
                    </tr>
                </thead>
                <tbody>
                    {renderData(props.stocks)}
                    <tr className={`bg-green-700 rounded-lg`}>
                        <td className={`text-center text-lg font-bold`} >Total</td>
                        <td className={`text-center text-lg font-bold`} ></td>
                        <td className={`text-center text-lg font-bold`} ></td>
                        <td className={`text-center text-lg font-bold`} >{props.values?.profitPercent}%</td>
                        <td className={`text-center text-lg font-bold`} >R$ {props.values?.absolute}</td>
                        <td className={`text-center text-lg font-bold`} ></td>
                        <td className={`text-center text-lg font-bold`} ></td>
                        <td className={`text-center text-lg font-bold`} ></td>
                        <td className={`text-center text-lg font-bold`} >{props.values?.invested}</td>
                        <td className={`text-center text-lg font-bold`} >{props.values?.current}</td>
                        <td className={`text-center text-lg font-bold`} ></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}