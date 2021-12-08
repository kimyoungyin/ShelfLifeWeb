// import { authService } from "fbase";
import React, { useState, useEffect } from "react";
import { dbService } from "fbase";
import "../css/OnSale.css";
import SaleItem from "components/SaleItem";
import { makeStyles, TextField } from "@material-ui/core";

const useStyles = makeStyles(() => ({
    search: {
        width: "80%",
        maxWidth: "600px",
        color: "#3F51B5",
        margin: "10px 0",
    },
    searchInput: {
        maxLength: 20,
        color: "#3F51B5",
    },
}));

const OnSale = () => {
    const classes = useStyles();
    const [onSales, setOnSales] = useState([]);
    const [input, setInput] = useState("");
    const [time, setTime] = useState(Date.now());

    useEffect(() => {
        const storeCode = JSON.parse(localStorage.getItem("storeCode"));
        const fetchData = async () => {
            await dbService
                .collection(storeCode)
                .doc("onSale")
                .onSnapshot((doc) => {
                    try {
                        const chickens = doc.data().list;
                        chickens.sort((a, b) => {
                            if (a.when > b.when) return 1;
                            if (a.when < b.when) return -1;

                            return 0;
                        });
                        setOnSales(chickens);
                    } catch (err) {
                        console.log(err);
                    }
                });
        };
        if (storeCode !== null) {
            fetchData();
            setInterval(setTime(Date.now()), 60000);
        }
        return () => {
            setOnSales([]);
        };
    }, []);

    const handleInput = (event) => {
        const {
            target: { value },
        } = event;
        setInput(value);
    };

    const filterInput = onSales.filter((item) => {
        return item.text.includes(input);
    });

    return (
        <>
            {onSales ? (
                <div className="OnSale">
                    <TextField
                        label="진열중인 제품 검색"
                        onChange={handleInput}
                        value={input}
                        inputProps={{ className: classes.searchInput }}
                        className={classes.search}
                        variant="outlined"
                    />

                    {filterInput.map((itemObj) => (
                        <SaleItem
                            key={itemObj.when}
                            itemObj={itemObj}
                            time={time}
                            onSales={onSales}
                        />
                    ))}
                </div>
            ) : (
                <div>진열중인 제품이 없습니다</div>
            )}
        </>
    );
};

export default OnSale;
