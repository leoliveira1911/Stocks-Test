import { useState } from "react";
import { EditIcon, DeleteIcon, VisibleIcon } from "../icons";

interface TableProps {
  stocks: any[][];
  values: {
    profitPercent;
    invested;
    current;
    absolute;
    rowCount;
  };
  update: (e) => void;
  del: (e) => void;
}

export default function Table(props: TableProps) {
  function renderData(data) {
    return data?.map((el, index) => {
      if (el[0] != "" && index > 0)
        return (
          <tr
            key={index}
            className={`
                    ${
                      index % 2 === 0
                        ? "bg-gray-200 dark:text-gray-200 dark:bg-gray-900 "
                        : "bg-gray-300  dark:bg-gray-600"
                    }
                    `}
          >
            <td className={`sm:hidden first:table-cell text-center px-3`}>
              {el[5] == "#N/A" ? "TICKER INVÁLIDO" : `${el[0]}`}
            </td>
            <td className={`text-center px-3`}>
              {el[5] == "#N/A" ? "TICKER INVÁLIDO" : `${el[1]}`}
            </td>
            <td className={`sm:hidden third:table-cell text-center px-3`}>
              {el[5] == "#N/A" ? "TICKER INVÁLIDO" : `${el[2]}`}
            </td>
            <td className={`text-center px-3`}>
              {el[3] == "#N/A" ? "TICKER INVÁLIDO" : `${el[3]}%`}
            </td>
            <td className={`sm:hidden second:table-cell text-center px-3`}>
              {el[4] == "#N/A"
                ? "TICKER INVÁLIDO"
                : parseFloat(el[4]) >= 0
                ? `R$${el[4]}`
                : el[4].substr(0, 1).concat("R$").concat(el[4].substr(1))}
            </td>
            <td className={`sm:hidden fifth:table-cell text-center px-3`}>
              {el[5] == "#N/A" ? "TICKER INVÁLIDO" : `R$${el[5]}`}
            </td>
            <td className={`sm:hidden fourth:table-cell text-center px-3`}>
              {el[5] == "#N/A" ? "TICKER INVÁLIDO" : `R$${el[6]}`}
            </td>
            <td className={`sm:hidden sixth:table-cell text-center px-3`}>
              {el[5] == "#N/A" ? "TICKER INVÁLIDO" : `${el[7]}`}
            </td>
            <td className={`sm:hidden fifth:table-cell text-center px-3`}>
              {el[5] == "#N/A" ? "TICKER INVÁLIDO" : `R$${el[8]}`}
            </td>
            <td className={`sm:hidden seventh:table-cell text-center px-3`}>
              {el[9] == "#N/A" ? "TICKER INVÁLIDO" : `R$${el[9]}`}
            </td>
            <td className={`text-center px-3`}>
              <div
                onClick={() => props.update(index)}
                className={`
                            
                     flex 
                     flex-shrink
                     justify-center 
                     items-center
                     text-green-600
                     rounded-full
                     p-2
                     m-1
                     hover:bg-purple-50
                     `}
              >
                {EditIcon}
              </div>
              <div
                onClick={() => props.del(index)}
                className={`
                     flex 
                     flex-shrink
                     justify-center 
                     items-center
                     text-red-600
                     rounded-full
                     p-2
                     m-1
                     hover:bg-purple-50
                     `}
              >
                {DeleteIcon}
              </div>
            </td>
          </tr>
        );
    });
  }

  const [visible, setVisible] = useState(false);

  function renderWalletValue() {
    return visible === true ? (
      <span className="cursor-pointer" onClick={callSetVisible}>
        {props.values?.current}
      </span>
    ) : (
      <div
        className={` cursor-pointer h-10 w-10 inline-block align-middle`}
        onClick={callSetVisible}
      >
        {VisibleIcon}
      </div>
    );
  }

  function callSetVisible() {
    visible === true ? setVisible(false) : setVisible(true);
  }

  return (
    <div
      className={`
        flex flex-col justify-center items-center w-full text-center
        `}
    >
      <h2 className={`font-bold text-4xl m-3`}>
        Valor da carteira : R$ {renderWalletValue()}{" "}
      </h2>
      <table className={`rounded-xl overflow-hidden mx-4 text-center`}>
        <thead
          className={`bg-gray-200 dark:text-gray-200 dark:bg-gray-900  py-2`}
        >
          <tr>
            <th className={`sm:hidden first:table-cell p-3`}>
              Data de Compra{" "}
            </th>
            <th className={`p-3`}>Empresa </th>
            <th className={`sm:hidden third:table-cell p-3`}>Ticker </th>
            <th className={`p-3`}>Lucro % </th>
            <th className={`sm:hidden second:table-cell p-3`}>Lucro Bruto </th>
            <th className={`sm:hidden fifth:table-cell p-3`}>Cotação atual </th>
            <th className={`sm:hidden fourth:table-cell p-3`}>
              Preço de compra{" "}
            </th>
            <th className={`sm:hidden sixth:table-cell p-3`}>
              Numero de Ações{" "}
            </th>
            <th className={`sm:hidden fifth:table-cell p-3`}>
              Valor Investido{" "}
            </th>
            <th className={`sm:hidden seventh:table-cell p-3`}>Saldo Atual </th>
            <th className={`p-3 `}>Ação </th>
          </tr>
        </thead>
        <tbody>
          {renderData(props.stocks)}
          <tr className={`bg-green-700 rounded-lg`}>
            <td className={`text-center text-lg font-bold`}>Total</td>
            <td
              className={`sm:hidden first:table-cell text-center text-lg font-bold`}
            ></td>
            <td
              className={`sm:hidden third:table-cell text-center text-lg font-bold`}
            ></td>
            <td className={`text-center text-lg font-bold`}>
              {props.values?.profitPercent}%
            </td>
            <td
              className={`sm:hidden second:table-cell text-center text-lg font-bold`}
            >
              R$ {props.values?.absolute}
            </td>
            <td
              className={`sm:hidden fifth:table-cell text-center text-lg font-bold`}
            ></td>
            <td
              className={`sm:hidden fourth:table-cell text-center text-lg font-bold`}
            ></td>
            <td
              className={`sm:hidden sixth:table-cell text-center text-lg font-bold`}
            ></td>
            <td
              className={`sm:hidden fifth:table-cell text-center text-lg font-bold`}
            >
              {props.values?.invested}
            </td>
            <td
              className={`sm:hidden seventh:table-cell text-center text-lg font-bold`}
            >
              {props.values?.current}
            </td>
            <td className={`text-center text-lg font-bold`}></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
