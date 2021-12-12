import { useState } from "react";

export const useInput = (initialValue, validateFunc) => {
    const [input, setInput] = useState(initialValue || "");
    const changeHandler = (event) => {
        const {
            target: { value },
        } = event;
        if (typeof validateFunc === "function") {
            validateFunc(value) && setInput(value);
        } else {
            setInput(value);
        }
    };

    const resetValue = () => setInput("");

    return [{ value: input, onChange: changeHandler }, resetValue];
};
