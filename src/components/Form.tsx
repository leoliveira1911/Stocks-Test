import { FormEvent, useEffect, useState } from "react";
import Button from "./Button";

interface FormProps {
  submit?: (e: FormEvent<HTMLFormElement>) => void;
  action: string;
  setDate: (e) => void;
  setCompany: (e) => void;
  setTicker: (e) => void;
  setBuyPrice: (e) => void;
  setShares: (e) => void;
  setType: (e) => void;
}

export default function Form(props: FormProps) {
  const [date, setDate] = useState("");
  const [company, setCompany] = useState("");
  const [ticker, setTicker] = useState("");
  const [buyPrice, setBuyPrice] = useState("");
  const [shares, setShares] = useState("");
  const [type, setType] = useState("");

  function resetValues() {
    setDate("");
    setCompany("");
    setTicker("");
    setBuyPrice("");
    setShares("");
  }

  return (
    <div
      className={`
        flex flex-col items-center justify-center m-2 p-3 rounded-2xl overflow-hidden
        bg-gray-200 dark:text-gray-200 dark:bg-gray-900 
        `}
    >
      <h3
        className={`
                         p-1 font-bold text-xl
                    `}
      >
        {props.action}
      </h3>
      <form onSubmit={(e) => props.submit(e)}>
        <div
          className={`
                        flex flex-col p-1 font-semibold
                    `}
        >
          <label htmlFor="date"> Data de compra</label>
          <input
            placeholder="DD/MM/AAAA"
            className={`text-black rounded-md px-2 py-1`}
            required
            value={date}
            onChange={(e) => {
              props.setDate(e.target.value);
              setDate(e.target.value);
            }}
            type="text"
            name="date"
            id="date"
          />
        </div>
        {/* <div className={`
                        flex flex-col p-1 font-semibold
                    `}>
                        <label htmlFor='company'> Empresa</label>
                        <input placeholder="Empresa ABC" className={`text-black rounded-md px-2 py-1`} required value={company} onChange={e => {props.setCompany(e.target.value) ; setCompany(e.target.value)}} type="text" name="company" id="company" />
                    </div> */}
        <div
          className={`
                        flex flex-col p-1 font-semibold
                    `}
        >
          <label htmlFor="ticker"> Ticker </label>
          <input
            placeholder="TICK3"
            className={`text-black rounded-md px-2 py-1`}
            required
            value={ticker}
            onChange={(e) => {
              props.setTicker(e.target.value);
              setTicker(e.target.value);
            }}
            type="text"
            name="ticker"
            id="ticker"
          />
        </div>
        <div
          className={`
                        flex flex-col p-1 font-semibold
                    `}
        >
          <label htmlFor="buyPrice"> Preço de compra </label>
          <input
            placeholder="99,99"
            className={`text-black rounded-md px-2 py-1`}
            required
            value={buyPrice}
            onChange={(e) => {
              props.setBuyPrice(e.target.value);
              setBuyPrice(e.target.value);
            }}
            type="text"
            name="buyPrice"
            id="buyPrice"
          />
        </div>
        <div
          className={`
                        flex flex-col p-1 font-semibold
                    `}
        >
          <label htmlFor="shares"> Número de ações </label>
          <input
            placeholder="100"
            className={`text-black rounded-md px-2 py-1`}
            required
            value={shares}
            onChange={(e) => {
              props.setShares(e.target.value);
              setShares(e.target.value);
            }}
            type="text"
            name="shares"
            id="shares"
          />
        </div>
        <div
          className={`
                        flex flex-col p-1 font-semibold
                    `}
        >
          <div>
            <input
              className={`mx-2`}
              type="radio"
              id="acao"
              name="type"
              value="acao"
              onClick={() => props.setType("acao")}
            />
            <label htmlFor="html">Ação</label>
          </div>
          <div>
            <input
              className={`mx-2`}
              type="radio"
              id="etf"
              name="type"
              value="etf"
              onClick={() => props.setType("etf")}
            />
            <label htmlFor="css">ETF</label>
          </div>
          <div>
            <input
              className={`mx-2`}
              type="radio"
              id="fii"
              name="type"
              value="fii"
              onClick={() => props.setType("fii")}
            />
            <label htmlFor="javascript">FII</label>
          </div>
          <div>
            <input
              className={`mx-2`}
              type="radio"
              id="fmmercado"
              name="type"
              value="fmmercado"
              onClick={() => props.setType("fmmercado")}
            />
            <label htmlFor="javascript">Fundo Multi Mercado</label>
          </div>
          <div>
            <input
              className={`mx-2`}
              type="radio"
              id="facao"
              name="type"
              value="facao"
              onClick={() => props.setType("facao")}
            />
            <label htmlFor="javascript">Fundo de ações</label>
          </div>
          <div>
            <input
              className={`mx-2`}
              type="radio"
              id="commodities"
              name="type"
              value="commodities"
              onClick={() => props.setType("commodities")}
            />
            <label htmlFor="commodities">Commodities</label>
          </div>
        </div>
        <div
          className={`
                    flex justify-center
                    `}
        >
          {/* <button type='submit' onClick={()=>resetValues}>Enviar</button> */}
          <Button
            type="submit"
            onClick={() => resetValues}
            label="Enviar"
          ></Button>
        </div>
      </form>
    </div>
  );
}
