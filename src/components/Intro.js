import React, { useState } from "react";
import social from "../img/social.gif";
import signup from "../img/signup.gif";
import login from "../img/login.gif";
import code from "../img/code.gif";
import addmenu from "../img/addmenu.gif";
import searchAddmenu from "../img/searchAddmenu.gif";
import addlist from "../img/addlist.gif";
import sell from "../img/sell.gif";
import anotherCode from "../img/anotherCode.gif";
import ArrowLeftIcon from "@material-ui/icons/ArrowLeft";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import "../css/Intro.css";
import { Fab } from "@material-ui/core";

const Intro = ({ introOut }) => {
    const [gifImg, setGifImg] = useState(social);

    const gifList = [
        social,
        signup,
        login,
        code,
        addmenu,
        searchAddmenu,
        addlist,
        sell,
        anotherCode,
    ];

    const gifTitle = [
        "Google 혹은 Github 계정으로 로그인하기",
        "회원가입",
        "로그인",
        "매장코드 등록하기",
        "진열이 가능한 제품 미리 등록하기",
        "원하는 제품 찾기",
        "진열하기",
        "판매 혹은 폐기하기",
        "매장코드 변경하기",
    ];

    const gifText = [
        "구글, 깃허브 계정이 있다면 빠르게 로그인하세요!",
        "계정이 없어도 괜찮아요. 이메일과 비밀번호로 간단하게 회원가입하세요!",
        "가입한 계정으로 로그인하세요. 한 번 로그인하면 다음에 접속할 때도 자동으로 로그인됩니다!",
        "매장에서 사용할 코드를 생성하세요. 코드를 공유하여 매장 직원들이 동시에 같은 제품들을 관리할 수 있습니다!",
        "매장에서 진열할 수 있는 제품을 미리 등록하세요. 등록된 제품들은 클릭 몇 번으로 빠르게 진열을 시작할 수 있습니다!",
        "제품이 너무 많아 찾기 힘드신가요? 실시간 검색으로 제품을 찾아보세요!",
        "매장에서 진열이 시작된 제품이 있으신가요? 진열가능 제품 창에서 클릭 몇 번으로 동시에 진열을 시작하세요! 진열한 지 얼마나 되었는지 색깔과 시간으로 확인이 가능합니다!",
        "진열중인 제품이 전부(혹은 일부)가 판매 혹은 폐기 처리되었나요? 제거 버튼으로 빠르게 처리하세요!",
        "일하는 매장을 옮겼거나 다른 이유로 매장 코드를 변경하고 싶다면, 내정보에서 버튼을 찾아 클릭하세요!",
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    const onClick = async () => {
        await setGifImg(gifList[currentIndex + 1]);
        setCurrentIndex(currentIndex + 1);
    };

    const onBackClick = async () => {
        await setGifImg(gifList[currentIndex - 1]);
        setCurrentIndex(currentIndex - 1);
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
            <div className={filterBackButton()} onClick={onBackClick}>
                <Fab size="small" color="secondary">
                    <ArrowLeftIcon />
                </Fab>
            </div>
            <div className="Intro-main">
                <div className="Intro-gifTitle">{gifTitle[currentIndex]}</div>
                <img
                    src={gifImg}
                    alt={`${currentIndex}번 가이드`}
                    width="200px"
                />
                <div className="Intro-gifText">{gifText[currentIndex]}</div>
                <div className="Intro-out" onClick={introOut}>
                    다시 이 창을 열지 않습니다(시작하기)
                </div>
            </div>
            <div className={filterFowadButton()} onClick={onClick}>
                <Fab size="small" color="secondary">
                    <ArrowRightIcon />
                </Fab>
            </div>
        </div>
    );
};

export default Intro;
