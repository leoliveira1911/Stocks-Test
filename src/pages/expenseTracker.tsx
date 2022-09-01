import { useEffect, useState } from "react";
import { setFlagsFromString } from "v8";
import Button from "../components/Button";
import FormExpense from "../components/FormExpense";
import TableExpenses from "../components/TableExpenses";
import Layout from "../components/template/Layout";
import useAuth from "../data/hook/useAuth";

export default function News() {
  const [expenses, setExpenses] = useState();
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [type, setType] = useState("");
  const [deadline, setDeadline] = useState("");
  const [form, setForm] = useState("");
  const [id, setId] = useState("");

  const auth = useAuth();
  const user = auth.user?.uid;

  async function submitData() {
    const params = {
      name: name,
      type: type,
      value: +value,
      user: user,
      deadline: deadline,
    };
    const response = await fetch("/api/mysql/postData", {
      method: "POST",
      body: JSON.stringify(params),
    });
    getData();
    resetValues();
    setForm("");
    return response;
  }

  function resetValues() {
    setName("");
    setValue("");
    setType("");
    setDeadline("");
  }

  async function getData() {
    const params = { user: user };
    const response = await fetch("/api/mysql/getData", {
      method: "POST",
      body: JSON.stringify(params),
    });
    const res = await response.json();
    setExpenses(res.data);
  }

  async function deleteData(id) {
    const params = { id: id };
    const response = await fetch("/api/mysql/deleteData", {
      method: "POST",
      body: JSON.stringify(params),
    });
    const res = await response.json();
    getData();
  }

  function updateDataForm(el) {
    setDeadline(el.deadline);
    setName(el.name);
    setType(el.type);
    setValue(el.value);
    setForm("update");
    setId(el.id);
  }

  async function updateData() {
    const params = {
      name: name,
      type: type,
      value: +value,
      user: user,
      deadline: deadline,
      id: id,
    };
    const response = await fetch("/api/mysql/updateData", {
      method: "POST",
      body: JSON.stringify(params),
    });
    const res = await response.json();
    setForm("");
    getData();
  }

  useEffect(() => {
    return () => {
      getData();
    };
  }, [user]);

  return (
    <Layout
      title="Controle de despesas"
      subtitle="Aqui serão gerenciadas as suas despesas"
    >
      <TableExpenses
        stocks={expenses}
        del={(id) => deleteData(id)}
        update={(el) => updateDataForm(el)}
      ></TableExpenses>

      {form == "" ? (
        <Button
          label={"Adicionar Despesa"}
          onClick={() => setForm("add")}
          type="button"
        ></Button>
      ) : null}

      {form == "add" ? (
        <FormExpense
          label="Adicionar"
          setDeadline={setDeadline}
          setName={setName}
          setType={setType}
          setValue={setValue}
          submit={() => {
            submitData();
          }}
        ></FormExpense>
      ) : form == "update" ? (
        <FormExpense
          label="Editar"
          setDeadline={setDeadline}
          setName={setName}
          setType={setType}
          setValue={setValue}
          deadline={deadline}
          name={name}
          type={type}
          value={value}
          submit={() => {
            updateData();
          }}
        ></FormExpense>
      ) : null}
    </Layout>
  );
}
