import { Button, ButtonGroup } from "@material-ui/core";
import { authService } from "fbase";
import React from "react";
import { useHistory } from "react-router";
import "../css/Profile.css";

const Profile = ({ userObj }) => {
  const history = useHistory();

  const onLogOutClick = () => {
    authService.signOut();
    history.push("/");
  };

  const deleteLS = () => {
    localStorage.clear();
    history.push("/");
  };

  const dropDown = () => {
    const article = document.querySelector(".Profile-article");
    const off = article.classList.contains("off");
    if (off === false) {
      article.classList.add("off");
    } else {
      article.classList.remove("off");
    }
  };
  return (
    <div className="Profile">
      <div className="Profile-user">
        <div>
          모든 점주님, 알바생,
          <br /> 자영업자분들 화이팅!
        </div>
        <div>사용중인 계정</div>
        <div>{userObj.email}</div>
        <Button variant="contained" color="primary" onClick={dropDown}>
          사용 가이드
        </Button>
      </div>
      <article className="Profile-article off">
        <article>
          <h3 className="Profile-question">
            0. 왜 이 앱/웹을 만들게 되었나요?
          </h3>
          <p className="Profile-step">
            저는 편의점 알바를 하는 편돌이인데, 진열기한(상미시간)을 종이로
            프린트해서 너무 번거롭게 관리하더라구요.. 고민 끝에 제가 직접
            해결해보기로 다짐했고, 이 앱/웹을 만들게 되었습니다.
          </p>
        </article>
        <article>
          <h3 className="Profile-question">
            1. 이 웹/앱은 어떤 용도로 사용하면 좋을까요?
          </h3>
          <p className="Profile-step">
            매장 내에서{" "}
            <span className="Profile-emphasize">
              유통기한이 적혀있지 않거나, 오래 진열할 수 없는 제품의 진열시간을
              체크하는 목적
            </span>
            으로 사용하면 좋습니다.
          </p>
          <p className="Profile-explain">
            ex) 편의점-치킨 / 빵집-케익 / 시장에서 내놓은 음식 등
          </p>
        </article>
        <article>
          <h3 className="Profile-question">
            2. 진열가능한 제품을 새로 등록하기
          </h3>
          <p className="Profile-step">
            1) 진열가능 <br />
            2) 진열가능 제품 등록 <br />
            3) "+" 버튼 클릭
          </p>
          <p className="Profile-explain">
            같은 이름의 진열가능 제품은 다시 등록할 수 없습니다.
          </p>
        </article>
        <article>
          <h3 className="Profile-question">
            3. 진열가능한 제품 중 원하는 제품을 검색하기
          </h3>
          <p className="Profile-step">
            1) 진열가능 <br />
            2) 진열가능 제품 검색
          </p>
          <p className="Profile-explain">
            입력값에 따라 자동으로 필터링됩니다.
          </p>
        </article>
        <article>
          <h3 className="Profile-question">4. 진열가능한 제품을 수정하기</h3>
          <p className="Profile-step">
            1) 진열가능 <br />
            2) "수정하기" 버튼 클릭 <br />
            3) 수정하고자 하는 제품의 변경(제거) 버튼 클릭 <br />
            4) 수정 후 "수정완료" 버튼 클릭
          </p>
          <p className="Profile-explain">
            제품명 변경 혹은 제품 제거를 할 수 있습니다.
          </p>
        </article>
        <article>
          <h3 className="Profile-question">
            5. 진열가능한 제품의 진열 시작하기
          </h3>
          <p className="Profile-step">
            1) 진열가능 <br />
            2) "진열하기" 버튼 클릭 <br />
            3) 진열하고 싶은 제품들의 "0개" 버튼을 연속클릭(혹은 초기화)하여
            진열수량 정하기 <br />
            4) "진열" 버튼 클릭으로 한번에 진열 시작!
          </p>
          <p className="Profile-explain">
            진열중 페이지에서 확인할 수 있습니다.
          </p>
        </article>
        <article>
          <h3 className="Profile-question">
            6. 진열중인 제품 제거(판매 혹은 폐기)하기
          </h3>
          <p className="Profile-step">
            1) 진열중 <br />
            2) 제거하려는 제품 클릭 <br />
            3) 제품의 개수(기본값은 진열수량)를 입력하고 "개 제거" 클릭
            <br />
          </p>
          <p className="Profile-explain">
            진열중이던 제품이 판매되었거나 시간이 너무 오래되었을 경우
            제거합니다.
          </p>
        </article>
        <article>
          <h3 className="Profile-question">7. 로그아웃</h3>
          <p className="Profile-step">
            1) 내정보 <br />
            2) "로그아웃" 버튼 클릭 <br />
          </p>
          <p className="Profile-explain">
            본인 명의의 계정은 한 개만 생성 가능합니다.
          </p>
        </article>
        <article>
          <h3 className="Profile-question">8. 매장코드 변경</h3>
          <p className="Profile-step">
            1) 내정보 <br />
            2) "다른 매장으로 접속" 버튼 클릭 <br />
          </p>
          <p className="Profile-explain">
            본인 명의의 계정은 한 개만 생성 가능합니다.
          </p>
        </article>
      </article>
      <ButtonGroup className="Profile-buttons">
        <Button variant="contained" color="secondary" onClick={onLogOutClick}>
          Log Out
        </Button>
        <Button variant="contained" color="default" onClick={deleteLS}>
          다른 매장으로 접속
        </Button>
      </ButtonGroup>
    </div>
  );
};
export default Profile;
