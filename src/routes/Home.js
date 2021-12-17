import React from "react";
import "css/Store.css";
import { useSelector } from "react-redux";
import BottomButtons from "components/home/BottomButtons";
import HomeContent from "components/home/HomeContent";

const Home = ({ storeCode }) => {
    const { mode } = useSelector((state) => state.products);

    return (
        <div className="Store">
            <>
                <HomeContent mode={mode} storeCode={storeCode} />
                <BottomButtons mode={mode} storeCode={storeCode} />
            </>
        </div>
    );
};

export default Home;
