import React from "react";
import ArrowLeftIcon from "@material-ui/icons/ArrowLeft";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import "../css/Intro.css";
import { Fab } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { introActions } from "Redux-store/intro-slice";
import { gifList, gifText, gifTitle } from "assets/code/introData";

const Intro = ({ introOut }) => {
    const currentIndex = useSelector((state) => state.intro.currentIndex);
    const dispatch = useDispatch();

    const nextClickHandler = () => {
        dispatch(introActions.next());
    };

    const prevClickHandler = () => {
        dispatch(introActions.prev());
    };

    const filterBackButton = () => {
        if (currentIndex === 0) {
            return "Intro-backButton hidden";
        } else {
            return "Intro-backButton";
        }
    };

    const filterFowadButton = () => {
        if (currentIndex === 8) {
            return "Intro-forwardButton hidden";
        } else {
            return "Intro-forwardButton";
        }
    };

    return (
        <div className="Intro">
            <div className={filterBackButton()} onClick={prevClickHandler}>
                <Fab size="small" color="secondary">
                    <ArrowLeftIcon />
                </Fab>
            </div>
            <div className="Intro-main">
                <div className="Intro-gifTitle">{gifTitle[currentIndex]}</div>
                <img
                    src={gifList[currentIndex]}
                    alt={`${currentIndex}번 가이드`}
                    width="200px"
                />
                <div className="Intro-gifText">{gifText[currentIndex]}</div>
                <div className="Intro-out" onClick={introOut}>
                    다시 이 창을 열지 않습니다(시작하기)
                </div>
            </div>
            <div className={filterFowadButton()} onClick={nextClickHandler}>
                <Fab size="small" color="secondary">
                    <ArrowRightIcon />
                </Fab>
            </div>
        </div>
    );
};

export default Intro;
