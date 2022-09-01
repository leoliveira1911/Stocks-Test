import { FormEvent, useEffect, useState } from "react";
import Button from "./Button";

interface FormProps {
  label: string;
  submit?: () => void;
  setName: (e) => void;
  setType: (e) => void;
  setValue: (e) => void;
  setDeadline: (e) => void;
  name?: string;
  type?: string;
  value?: string;
  deadline?: string;
}

export default function Form(props: FormProps) {
  const [name, setName] = useState(props.name ?? "");
  const [value, setValue] = useState(props.value ?? "");
  const [type, setType] = useState(props.type ?? "");
  const [deadline, setDeadline] = useState(props.deadline ?? "");

  function resetValues() {
    setName("");
    setValue("");
    setType("");
    setDeadline("");
  }

  useEffect(() => {
    setName(props.name);
    setType(props.type);
    setValue(props.value);
    setDeadline(props.deadline);
  }, [props]);

  return (
    <div
      className={`
        flex flex-col items-center justify-center m-2 p-3 rounded-2xl overflow-hidden
        bg-gray-200 dark:text-gray-200 dark:bg-gray-900 
        `}
    >
      <h1>{props.label}</h1>
      <form>
        <div
          className={`
                        flex flex-col p-1 font-semibold
                    `}
        >
          <label htmlFor="name"> Despesa </label>
          <input
            placeholder="123"
            className={`text-black rounded-md px-2 py-1`}
            value={name}
            onChange={(e) => {
              props.setName(e.target.value);
              setName(e.target.value);
            }}
            type="text"
            name="name"
            id="name"
          />
        </div>
        <div
          className={`
                        flex flex-col p-1 font-semibold
                    `}
        >
          <label htmlFor="type"> Tipo </label>
          <input
            placeholder="123"
            className={`text-black rounded-md px-2 py-1`}
            required
            value={type}
            onChange={(e) => {
              props.setType(e.target.value);
              setType(e.target.value);
            }}
            type="text"
            name="type"
            id="type"
          />
        </div>
        <div
          className={`
                        flex flex-col p-1 font-semibold
                    `}
        >
          <label htmlFor="value"> Valor </label>
          <input
            placeholder="123"
            className={`text-black rounded-md px-2 py-1`}
            required
            value={value}
            onChange={(e) => {
              props.setValue(e.target.value);
              setValue(e.target.value);
            }}
            type="text"
            name="value"
            id="value"
          />
        </div>
        <div
          className={`
                        flex flex-col p-1 font-semibold
                    `}
        >
          <label htmlFor="deadline"> Vencimento </label>
          <input
            placeholder="123"
            className={`text-black rounded-md px-2 py-1`}
            value={deadline}
            onChange={(e) => {
              props.setDeadline(e.target.value);
              setDeadline(e.target.value);
            }}
            type="text"
            name="deadline"
            id="deadline"
          />
        </div>

        <div
          className={`
                    flex justify-center
                    `}
        >
          {/* <button type='submit' onClick={()=>resetValues}>Enviar</button> */}
          <Button
            type="button"
            onClick={() => {
              props.submit();
              resetValues();
            }}
            label="Enviar"
          ></Button>
        </div>
      </form>
    </div>
  );
}
