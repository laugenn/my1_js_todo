import React from "react";

interface InputErrorProps {
  inputErrorFlg: boolean;
}

/**
 * InputError コンポーネント
 *
 * @param {object} props
 * @param {boolean} props.inputErrorFlg - エラー判定
 * @returns {React.ReactElement}
 */
const InputError: React.FC<InputErrorProps> = (props: InputErrorProps) => {
  return (
    <>
      {props.inputErrorFlg && (
        <>
          <p className="error">入力してください</p>
        </>
      )}
    </>
  );
};

export default InputError;
