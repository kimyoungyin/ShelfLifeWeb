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
      <div>점주님, 알바생 모두 화이팅!</div>
      <div>사용중인 계정 : {userObj.email}</div>
      <button onClick={onLogOutClick}>Log Out</button>
      <button onClick={deleteLS}>다른 매장코드로 접속</button>
    </div>
  );
};
export default Profile;
