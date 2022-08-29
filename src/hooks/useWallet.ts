import { FormEvent, useState } from "react";
import useAuth from "../data/hook/useAuth";

export default function useWallet() {
    const [addStockForm, setAddStockForm] = useState("hide");
    const [updateRow, setUpdateRow] = useState(0);
    const [updateStockForm, setUpdateStockForm] = useState("hide");
    const [date, setDate] = useState("");
    const [company, setCompany] = useState("");
    const [ticker, setTicker] = useState("");
    const [buyPrice, setBuyPrice] = useState("");
    const [shares, setShares] = useState("");
    const [type, setType] = useState("");
    const [stocks, setStocks] = useState();
    const [values, setValues] = useState<{
        profitPercent;
        invested;
        current;
        absolute;
        rowCount;
    }>();

    const autentication = useAuth();
    const userUID = autentication.user?.uid;
    //console.log('UID' , userUID)

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(e);
        //DATA	COMPANY	TICKER	PROFIT_PERCENT	PROFIT_ABSOLUTE	PRICE	BUY_PRICE	SHARES	INVESTED_VALUE	CURRENT
        const form = {
            date,
            company: `=GOOGLEFINANCE((C${values.rowCount + 2});"name")`,
            ticker,
            profitPercent: `=ROUND((G${values.rowCount + 2}-F${values.rowCount + 2
                })/G${values.rowCount + 2}*(-100);2)`,
            profitAbsolute: `=FIXED((F${values.rowCount + 2}-G${values.rowCount + 2
                })*H${values.rowCount + 2};2)`,
            price: `=FIXED(GOOGLEFINANCE(C${values.rowCount + 2}) ;2 )`,
            buyPrice: `=FIXED(${buyPrice};2)`,
            shares,
            investedValue: `=FIXED(H${values.rowCount + 2}*G${values.rowCount + 2
                }; 2)`,
            current: `=FIXED(H${values.rowCount + 2}*F${values.rowCount + 2} ; 2)`,
            type,
        };

        const response = await fetch(`/api/submit/${userUID}`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
        });

        const content = await response.json();

        alert(content);

        setAddStockForm("hide");
        setDate("");
        setCompany("");
        setTicker("");
        setBuyPrice("");
        setShares("");
        setType("");

        handleGet();
    };

    const handleGet = async () => {
        const response = await fetch(`/api/get/${userUID}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        });

        const content = await response.json();
        //console.log(content)
        const stock = await content.data;

        setStocks(stock);
        calcValues(stock);
    };

    const update = (e) => {
        updateStockForm === "hide"
            ? setUpdateStockForm("show")
            : setUpdateStockForm("hide");
        setUpdateRow(e);
    };

    const updateStock = async (e: FormEvent<HTMLFormElement>, row) => {
        e.preventDefault();

        const form = {
            date,
            company: `=GOOGLEFINANCE((C${row + 1});"name")`,
            ticker,
            profitPercent: `=FIXED((G${row + 1}-F${row + 1})/G${row + 1}*(-100);2)`,
            profitAbsolute: `=FIXED((F${row + 1}-G${row + 1})*H${row + 1};2)`,
            price: `=FIXED(GOOGLEFINANCE(C${row + 1});2)`,
            buyPrice: `=FIXED(${buyPrice};2)`,
            shares,
            investedValue: `=FIXED(H${row + 1}*G${row + 1};2)`,
            current: `=FIXED(H${row + 1}*F${row + 1} ;2)`,
            type,
            range: `${userUID}!A${row + 1}:K${row + 1}`,
        };

        const response = await fetch(`/api/update/${userUID}`, {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
        });

        const content = await response;

        alert(content);

        setDate("");
        setCompany("");
        setTicker("");
        setBuyPrice("");
        setShares("");
        setType("");
        setUpdateRow(0);
        setUpdateStockForm("hide");

        handleGet();
    };

    const del = async (e) => {
        const form = {
            range: `${e + 1}`,
        };

        const response = await fetch(`/api/delete/${userUID}`, {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
        });

        const content = await response;

        alert(content);

        setDate("");
        setCompany("");
        setTicker("");
        setBuyPrice("");
        setShares("");

        handleGet();
    };

    function addStock() {
        addStockForm == "hide" ? setAddStockForm("show") : setAddStockForm("hide");
    }

    function calcValues(data) {
        let invested = 0;
        let current = 0;
        let rowCount = 0;
        data?.map((el) => {
            if (el[0] != "" && el[0] != "DATE") {
                let stringInvestedBeforeTreat = el[8];
                let stringInvestedAfterTreat = stringInvestedBeforeTreat
                    .replace("R$", "")
                    .replace(".", "")
                    .replace(",", ".")
                    .replace(" ", "");
                let valueInvested = parseFloat(stringInvestedAfterTreat);
                invested = invested + valueInvested;

                let stringCurrentBeforeTreat = el[9];
                let stringCurrentAfterTreat = stringCurrentBeforeTreat
                    .replace("R$", "")
                    .replace(".", "")
                    .replace(",", ".")
                    .replace(" ", "");
                let valueCurrent = parseFloat(stringCurrentAfterTreat);
                current = current + valueCurrent;

                rowCount = rowCount + 1;
            }
        });

        let profitPercent = (((current - invested) / invested) * 100).toFixed(2);
        let absolute = (current - invested).toFixed(2);
        let values = {
            profitPercent,
            invested: invested.toFixed(2),
            current: current.toFixed(2),
            absolute,
            rowCount,
        };
        setValues(values);
    }

    return {
        userUID,
        handleGet,
        handleSubmit,
        updateStockForm,
        updateStock,
        updateRow,
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
        setShares, setStocks, setTicker, setType,
    }
}