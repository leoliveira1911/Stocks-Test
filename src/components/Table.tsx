interface TableProps {
    current?: string,
    stocks: any[][],
    profitPercent?: string,
    absolute?: string,
    invested?: string,
    values: {
        profitPercent,
        invested,
        current,
        absolute,
        rowCount
    }
}

export default function Table(props:TableProps ) {
    function renderData(data) {
        return data.map((el, index) => {
            if (el[0] != "" && index > 0)
                return (
                    <tr key={index}>
                        <td>{el[0]}</td>
                        <td>{el[1]}</td>
                        <td>{el[2]}</td>
                        <td>{el[3]}</td>
                        <td>{el[4]}</td>
                        <td>{el[5]}</td>
                        <td>{el[6]}</td>
                        <td>{el[7]}</td>
                        <td>{el[8]}</td>
                        <td>{el[9]}</td>
                    </tr>
                )
        })
    }

    return (
        <div>
        <h1>Shares</h1>
        <h2>Valor da carteira : R$ {props.values?.current}</h2>
        <table>
            <thead>
                <tr>
                    <th>Data de Compra </th>
                    <th>Empresa </th>
                    <th>Ticker </th>
                    <th>Lucro % </th>
                    <th>Lucro Bruto </th>
                    <th>Cotação atual </th>
                    <th>Preço de compra </th>
                    <th>Numero de Ações </th>
                    <th>Valor Investido </th>
                    <th>Saldo Atual </th>
                </tr>
            </thead>
            <tbody>
                {renderData(props.stocks)}
                <tr>
                    <td>Total</td>
                    <td></td>
                    <td></td>
                    <td>{props.values?.profitPercent}%</td>
                    <td>R$ {props.values?.absolute}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>{props.values?.invested}</td>
                    <td>{props.values?.current}</td>
                </tr>
            </tbody>
        </table>
        </div>
    )
}