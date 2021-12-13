import { Fab } from "@material-ui/core";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import { useInput } from "hooks/useInput";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { productsActions } from "Redux-store/products-slice";
import "../css/Store.css";

const Register = ({ storeCode }) => {
    const [storeCodeInput] = useInput(storeCode);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmit = (event) => {
        event.preventDefault();
        dispatch(productsActions.changeStoreCode(storeCodeInput.value));
        navigate("/");
    };

    return (
        <div className="Register">
            <form className="Store-code" onSubmit={onSubmit}>
                <input {...storeCodeInput} type="text" placeholder="매장코드" />
                <Fab
                    size="small"
                    type="submit"
                    color="secondary"
                    aria-label="add"
                >
                    <PlayArrowIcon />
                </Fab>
            </form>
            <div className="Store-explain">
                <h3 className="Store-explain-title">
                    입력된 매장코드는 아래 두 가지 중 한 가지를 수행하게 됩니다.
                </h3>
                <h3 className="Store-explain-warning">
                    주의 : 코드를 공유한 매장 직원 외 다른 사람이 접속하지
                    못하도록 복잡하게 설정해주세요
                    <br />
                    (예시: "매장명"(단순) / "gteg매장명sdfs(복잡)")
                </h3>
                <h3>{"1) 매장코드 새로 생성합니다."}</h3>
                매장 내에서 사용할 독특한 코드를 생성합니다. 직원들과 코드를
                공유하세요
                <br />
                <h3>{"2) 공유된 매장코드로 접속합니다."}</h3>
                진열상품을 같은 같은 코드로 접속하여, 매장 직원들과 공동으로
                진열기한을 관리하세요
            </div>
        </div>
    );
};

export default Register;
