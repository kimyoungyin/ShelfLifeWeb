import { createSlice } from "@reduxjs/toolkit";
import { dbService, firebaseInstance } from "fbase";
import { errorActions } from "./error-slice";

export const productsModes = {
    DEFAULT: "default",
    ADD: "add",
    EDIT: "edit",
};

const productsInitialState = {
    storeCode: JSON.parse(localStorage.getItem("storeCode")),
    mode: productsModes.DEFAULT,
    readyProducts: [],
    productsCart: [],
    sellingProducts: [],
    editingProduct: null, //string
    deletingProductObj: null, // object
};

const productsSlice = createSlice({
    name: "products",
    initialState: productsInitialState,
    reducers: {
        changeStoreCode: (state, action) => {
            localStorage.setItem("storeCode", JSON.stringify(action.payload));
            return { ...state, storeCode: action.payload };
        },
        changeMode: (state, action) => {
            if (!Object.values(productsModes).includes(action.payload))
                return state;
            return { ...state, mode: action.payload };
        },
        changeReadyProducts: (state, action) => {
            return { ...state, readyProducts: action.payload };
        },
        addCart: (state, action) => {
            const pureList = state.productsCart.filter(
                (prevItem) => prevItem.text !== action.payload
            );
            return { ...state, productsCart: [...pureList, action.payload] };
        },
        resetItem: (state, action) => {
            state.productsCart = state.productsCart.filter(
                (prevItem) => prevItem.text !== action.payload.text
            );
        },
        startSell: (state, action) => {
            // 비어있는지 creator로 체크
            return {
                ...state,
                sellingProducts: [...state.sellingProducts, ...action.payload],
            };
        },
        changeEditingProduct: (state, action) => {
            state.editingProduct = action.payload;
        },
        updateEditingProduct: (state, action) => {
            const updatingIndex = state.readyProducts.findIndex(
                (prevItem) => prevItem.text === state.editingProduct
            );
            state.readyProducts[updatingIndex] = action.payload;
        },
        changeDeletingProductObj: (state, action) => {
            state.deletingProductObj = action.payload;
        },
    },
});

// reducer
export const productsReducer = productsSlice.reducer;

// actions
export const productsActions = productsSlice.actions;

export const getReadyProducts = (storeCode) => {
    return async (dispatch) => {
        await dbService
            .collection(storeCode)
            .doc("Chickens")
            .onSnapshot((doc) => {
                try {
                    const chickens = doc.data().list;
                    chickens.sort((a, b) => {
                        if (a.text > b.text) return 1;
                        if (a.text < b.text) return -1;
                        return 0;
                    });
                    dispatch(errorActions.off());
                    dispatch(productsActions.changeReadyProducts(chickens));
                } catch (error) {
                    console.log(error);
                    dispatch(errorActions.on(error));
                }
            });
    };
};

export const startSellingProducts = (cart, storeCode) => {
    return async (dispatch) => {
        if (cart.length === 0)
            return dispatch(errorActions.on("진열할 제품을 선택해주세요"));
        try {
            await dbService
                .collection(storeCode)
                .doc("onSale")
                .update({
                    list: firebaseInstance.firestore.FieldValue.arrayUnion(
                        ...cart
                    ),
                });
            dispatch(productsActions.startSell(cart));
            dispatch(productsActions.changeMode(productsModes.DEFAULT)); // 다시 원상복귀
        } catch (error) {
            dispatch(errorActions.on(error));
        }
    };
};

export const validateAndChangeEditingProduct = (
    prevObj,
    newText,
    storeCode,
    readyProducts
) => {
    return async (dispatch) => {
        const checkInclude = (check, find) => {
            if (check === find) {
                return true;
            } else if (check !== find) {
                return false;
            }
        };
        if (prevObj.text === newText) {
            dispatch(errorActions.on("기존 제품명과 같습니다."));
        } else if (
            readyProducts
                .map((chicken) => checkInclude(chicken.text, newText))
                .includes(true)
        ) {
            dispatch(errorActions.on("이미 같은 제품이 목록에 있습니다."));
        } else {
            try {
                dispatch(errorActions.off());
                const restProducts = readyProducts.filter(
                    (product) => product.id !== prevObj.id
                );
                const editedProduct = {
                    id: prevObj.id,
                    text: newText,
                };
                console.log([...restProducts, editedProduct]);
                await dbService
                    .collection(storeCode)
                    .doc("Chickens")
                    .set({
                        list: [...restProducts, editedProduct],
                    });
                dispatch(productsActions.changeEditingProduct(null));
            } catch (error) {
                dispatch(errorActions.on(error));
            }
        }
    };
};

export const deleteProduct = (deletObj, storeCode) => {
    return async (dispatch) => {
        try {
            dispatch(productsActions.changeDeletingProductObj(null));
            await dbService
                .collection(storeCode)
                .doc("Chickens")
                .update({
                    list: firebaseInstance.firestore.FieldValue.arrayRemove(
                        deletObj
                    ),
                });
        } catch (error) {
            dispatch(errorActions.on(error));
        }
    };
};
