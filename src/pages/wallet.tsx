import { FormEvent, useEffect, useState } from "react";
import { clearInterval, setInterval } from "timers";
import Table from "../components/Table";
import Form from "../components/Form";
import useAuth from "../data/hook/useAuth";
import Button from "../components/Button";
import Layout from "../components/template/Layout";
import useWallet from "../hooks/useWallet";

export default function Post() {
  const {
    userUID,
    handleGet,
    autentication,
    values,
    stocks,
    update,
    del,
    addStock,
    addStockForm,
    setAddStockForm,
    setBuyPrice,
    setCompany,
    setDate,
    setShares,
    setStocks,
    setTicker,
    setType,
    handleSubmit,
    updateRow,
    updateStock,
    updateStockForm,
  } = useWallet();

  useEffect(() => {
    if (userUID) {
      handleGet();
    }
    const id = setInterval(() => {
      console.log(new Date());
      console.log("UID", userUID);
      handleGet();
      //setBrunaoDaMassa(brunaoDaMassa + 1)
      //console.log(brunaoDaMassa)
      //ExibirUserId()
    }, 60000);

    return () => {
      clearInterval(id);
    };
  }, [autentication.user]);

  return (
    <div
      className={`
    
        `}
    >
      <Layout
        title="Carteira de Ações"
        subtitle="Gerencie sua carteira de ações"
      >
        <div className="flex flex-col justify-center items-center">
          <Table
            values={values}
            stocks={stocks}
            update={(e) => update(e)}
            del={(e) => del(e)}
          ></Table>

          <Button onClick={addStock} label="Adicionar Nova Ação"></Button>
          {/*  <button onClick={addStock}>Adicionar Nova Ação</button> */}
          <div className="flex">
            {addStockForm === "show" ? (
              <Form
                action="Adicionar Nova Ação"
                setBuyPrice={(e) => setBuyPrice(e)}
                setCompany={(e) => setCompany(e)}
                setDate={(e) => setDate(e)}
                setTicker={(e) => setTicker(e)}
                setShares={(e) => setShares(e)}
                setType={(e) => setType(e)}
                submit={(e) => handleSubmit(e)}
              ></Form>
            ) : null}

            {updateStockForm === "show" ? (
              <Form
                action="Atualizar Ação"
                setBuyPrice={(e) => setBuyPrice(e)}
                setCompany={(e) => setCompany(e)}
                setDate={(e) => setDate(e)}
                setTicker={(e) => setTicker(e)}
                setShares={(e) => setShares(e)}
                setType={(e) => setType(e)}
                submit={(e) => updateStock(e, updateRow)}
              ></Form>
            ) : null}
          </div>
          {/*  <Button label={'teste'} onClick={()=> setUserValue()}></Button> */}
        </div>
      </Layout>
    </div>
  );
}
