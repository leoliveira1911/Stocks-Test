import { useState } from "react";
import { EditIcon, DeleteIcon, VisibleIcon } from "../icons";

interface TableProps {
  stocks: any[];
  update: (e) => void;
  del: (e) => void;
}

export default function Table(props: TableProps) {
  function renderData(data) {
    return data?.map((el, index) => {
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
          <td
            className={`sm:hidden first:table-cell text-center px-3`}
          >{`${el.name}`}</td>
          <td className={`text-center px-3`}>{`${el.type}`}</td>
          <td
            className={`sm:hidden third:table-cell text-center px-3`}
          >{`${el.user}`}</td>
          <td className={`text-center px-3`}>{`${el.value}`}</td>
          <td
            className={`sm:hidden second:table-cell text-center px-3`}
          >{`${el.deadline}`}</td>
          <td className={`text-center px-3`}>{`${el.id}`}</td>
          <td>
            <div
              onClick={() => props.update(el)}
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
              onClick={() => props.del(el.id)}
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

  return (
    <div
      className={`
        flex flex-col justify-center items-center w-full text-center
        `}
    >
      <h2 className={`font-bold text-4xl m-3`}>Valor da carteira :</h2>
      <table className={`rounded-xl overflow-hidden mx-4 text-center`}>
        <thead
          className={`bg-gray-200 dark:text-gray-200 dark:bg-gray-900  py-2`}
        >
          <tr>
            <th className={`sm:hidden first:table-cell p-3`}>Nome </th>
            <th className={`p-3`}>Tipo</th>
            <th className={`sm:hidden third:table-cell p-3`}>Valor</th>
            <th className={`p-3`}>Usuário</th>
            <th className={`sm:hidden second:table-cell p-3`}>Vencimento</th>
            <th className={`sm:hidden second:table-cell p-3`}>ID</th>
            <th className={`sm:hidden second:table-cell p-3`}>Ações</th>
          </tr>
        </thead>
        <tbody>{renderData(props.stocks)}</tbody>
      </table>
    </div>
  );
}
