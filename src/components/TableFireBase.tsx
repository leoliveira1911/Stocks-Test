import useAppData from "../data/hook/useAppData";
import React from "react";
import { useState } from "react";
import { EditIcon, DeleteIcon, VisibleIcon } from "../icons";
import Asset from "../core/asset/Asset";
import Chartkick from "chartkick";
import "chartkick/chart.js";
import { Chart } from "react-google-charts";
import { text } from "stream/consumers";

interface TableFireProps {
  assetAllocation: Asset[];
  stocks?: any[];
}

export default function TableFire(props: TableFireProps) {
  const ctx = useAppData();
  const theme = ctx.theme;
  const [acao, setAcao] = useState(0);
  const [etf, setEtf] = useState(0);
  const [fii, setFii] = useState(0);
  const [fmm, setFmm] = useState(0);
  const [facao, setFacao] = useState(0);
  const [commodities, setCommodities] = useState(0);

  function renderAssetDataBase() {
    const el = props?.assetAllocation[0];
    if (el) {
      const data = [
        ["Asset", "Percent"],
        ["Ações", +el.acoes],
        ["ETF", +el.etf],
        ["Fundo Imobiliário", +el.fimobiliario],
        ["Fundo Multi Mercado", +el.fmmercado],
        ["Fundo de Ações", +el.facoes],
        ["Commodities", +el.commodities],
      ];

      const options = {
        is3D: true,
        backgroundColor: `${
          theme === "dark" ? "rgb(31,41,55)" : "rgb(209,213,219)"
        }`,
        legendTextStyle: { color: `${theme === "dark" ? "#FFF" : "#000"}` },
        titleTextStyle: { color: `${theme === "dark" ? "#FFF" : "#000"}` },
      };
      return (
        <Chart
          chartType="PieChart"
          data={data}
          options={options}
          width={"100%"}
          height={"400px"}
        />
      );
    }
  }

  function renderAssetWallet() {
    console.log(props.stocks);
    const acoes = props?.stocks[0];
    const etf = props?.stocks[1];
    const fimobiliario = props?.stocks[2];
    const fmmercado = props?.stocks[3];
    const facao = props?.stocks[4];
    const commodities = props?.stocks[5];
    const data = [
      ["Asset", "Percent"],
      ["Ações", +acoes],
      ["ETF", +etf],
      ["Fundo Imobiliário", +fimobiliario],
      ["Fundo Multi Mercado", +fmmercado],
      ["Fundo de Ações", +facao],
      ["Commodities", +commodities],
    ];

    const options = {
      is3D: true,
      backgroundColor: `${
        theme === "dark" ? "rgb(31,41,55)" : "rgb(209,213,219)"
      }`,
      legendTextStyle: { color: `${theme === "dark" ? "#FFF" : "#000"}` },
      titleTextStyle: { color: `${theme === "dark" ? "#FFF" : "#000"}` },
    };
    return (
      <Chart
        chartType="PieChart"
        data={data}
        options={options}
        width={"100%"}
        height={"400px"}
      />
    );
  }

  return (
    <div
      className={`
        sm:flex flex-col md:flex-row  justify-center items-center w-full text-center
        `}
    >
      <div
        className={`
        m-4 sm:w-full md:w-1/2 text-xl
        `}
      >
        <h1>Asset Allocation de referência</h1>
        {renderAssetDataBase()}
      </div>
      <div
        className={`
        m-4 sm:w-full md:w-1/2 text-xl
        `}
      >
        <h1>Asset Allocation atual da carteira</h1>
        {renderAssetWallet()}
      </div>
    </div>
  );
}
