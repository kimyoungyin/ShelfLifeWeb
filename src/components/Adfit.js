import React from "react";
// import AdfitWebComponent from "react-adfit-web-component";

class IntegratedAdfitComponent extends React.Component {
  componentDidMount() {
    let ins = document.createElement("ins");
    let scr = document.createElement("script");

    ins.className = "kakao_ad_area";
    ins.style = "display:none; width:100%;";
    scr.async = "true";
    scr.type = "text/javascript";
    scr.src = "//t1.daumcdn.net/kas/static/ba.min.js";
    ins.setAttribute("data-ad-width", "320");
    ins.setAttribute("data-ad-height", "100");
    ins.setAttribute("data-ad-unit", "DAN-5hPtJ04zHtkDfeeW");

    document.querySelector(".adfit").appendChild(ins);
    document.querySelector(".adfit").appendChild(scr);
  }

  render() {
    return <div className="adfit" />;
  }
}

export default IntegratedAdfitComponent;
