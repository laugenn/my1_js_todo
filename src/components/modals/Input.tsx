import { TextField } from "@mui/material";
import React from "react";

interface InputProps {
  inputVal: string;
  setInputVal: React.Dispatch<React.SetStateAction<string>>;
}

/**
 * Input コンポーネント
 * todo入力欄
 *
 * @param {object} props
 * @param {string} props.inputVal - タスク入力欄の値
 * @param {React.Dispatch<React.SetStateAction<string>>} props.setInputVal - 入力欄の状態の更新関数
 * @returns {React.ReactElement}
 */
const Input: React.FC<InputProps> = (props: InputProps) => {
  return (
    <div className="margin10">
      <label className="margin-right10">内容：</label>
      <TextField
        label="内容"
        placeholder="入力してください"
        value={props.inputVal}
        onChange={(e) => {
          props.setInputVal(e.target.value);
        }}
      />
    </div>
  );
};

export default Input;
