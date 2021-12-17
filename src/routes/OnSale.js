import React, { useState, useEffect } from "react";
import "css/OnSale.css";
import SaleItem from "components/SaleItem";
import { makeStyles, TextField } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { getSellingProducts } from "Redux-store/products-slice";
import { useInput } from "hooks/useInput";

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

const OnSale = ({ storeCode }) => {
    const classes = useStyles();
    const sellingProducts = useSelector(
        (state) => state.products.sellingProducts
    );
    const dispatch = useDispatch();
    const [time, setTime] = useState(Date.now());
    const [searchInput] = useInput("");

    useEffect(() => {
        dispatch(getSellingProducts(storeCode));

        let id = setInterval(() => setTime(Date.now()), 60000);

        return () => {
            clearInterval(id);
        };
    }, [dispatch, storeCode]);

    const filterInput = sellingProducts.filter((item) => {
        return item.text.includes(searchInput.value);
    });

    return (
        <>
            {sellingProducts ? (
                <div className="OnSale">
                    <TextField
                        label="진열중인 제품 검색"
                        {...searchInput}
                        inputProps={{ className: classes.searchInput }}
                        className={classes.search}
                        variant="outlined"
                    />

                    {filterInput.map((itemObj) => (
                        <SaleItem
                            key={itemObj.when}
                            itemObj={itemObj}
                            time={time}
                            storeCode={storeCode}
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
