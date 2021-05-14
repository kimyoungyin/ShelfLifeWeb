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
  return (
    <div className="Profile">
      <div className="Profile-user">
        <div>점주님, 알바생 모두 화이팅!</div>
        <div>사용중인 계정</div>
        <div>{userObj.email}</div>
      </div>
      <article className="Profile-article">
        <article>
          <h3 className="Profile-question">
            1. 진열가능한 제품을 새로 등록하기
          </h3>
          <p className="Profile-step">
            1) 진열가능 <br />
            2) 진열가능 제품 등록 <br />
            3) 오른쪽 버튼 클릭
          </p>
          <p className="Profile-explain">
            같은 이름의 진열가능 제품은 다시 등록할 수 없습니다.
          </p>
        </article>
        <article>
          <h3 className="Profile-question">
            2. 진열가능한 제품 중 원하는 제품을 검색하기
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
          <h3 className="Profile-question">3. 진열가능한 제품을 수정하기</h3>
          <p className="Profile-step">
            1) 진열가능 <br />
            2) 수정하기 버튼 클릭 <br />
            3) 수정하고자 하는 제품의 변경(제거) 버튼 클릭 <br />
            4) 수정 후 수정완료 버튼 클릭
          </p>
          <p className="Profile-explain">
            제품명 변경 혹은 제품 제거를 할 수 있습니다.
          </p>
        </article>
        <article>
          <h3 className="Profile-question">
            4. 진열가능한 제품의 진열 시작하기
          </h3>
          <p className="Profile-step">
            진열가능 <br />
            1) 진열하기 버튼 클릭 <br />
            2) 진열하고 싶은 제품들의 "0개" 버튼을 연속클릭(혹은 초기화)하여
            진열수량 정하기 <br />
            3) 진열 버튼 클릭으로 한번에 진열 시작!
          </p>
          <p className="Profile-explain">
            진열중 페이지에서 확인할 수 있습니다.
          </p>
        </article>
        <article>
          <h3 className="Profile-question">
            5. 진열중인 제품 제거(판매 혹은 폐기)하기
          </h3>
          <p className="Profile-step">
            진열중 <br />
            1) 제거하려는 제품 클릭 <br />
            2) 제품의 개수(기본값은 진열수량)를 입력하고 "개 제거" 클릭
            <br />
          </p>
          <p className="Profile-explain">
            진열중이던 제품이 판매되었거나 시간이 너무 오래되었을 경우
            제거합니다.
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
