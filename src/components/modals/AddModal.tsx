import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";

import { useState } from "react";

import { useTodoDispatch } from "../../contexts/TodoContext";
import { Todo } from "../../types/TodoType";
import CloseButton from "./CloseButton";
import Input from "./Input";
import InputError from "./InputError";
import Radio from "./Radio";
import SubmitButton from "./SubmitButton";

// モーダルのスタイル
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

/**
 * AddModal コンポーネント
 * 追加ボタン押下時に表示するモーダル
 *
 * @returns {React.ReactElement}
 */
const AddModal: React.FC = () => {
  // モーダルの開閉状態
  const [isOpen, setIsOpen] = useState<boolean>(false);
  // 入力値の状態
  const [inputVal, setInputVal] = useState<string>("");
  // Todo入力値のエラー判定
  const [inputErrorFlg, setInputErrorFlg] = useState<boolean>(false);
  // ラジオの状態
  const [selectVal, setSelectVal] = useState<number>(0);

  // dispatch関数を取得
  const dispatch = useTodoDispatch();

  // 追加ボタンを押下時、todoの状態を更新
  const addTodo = () => {
    // 空文字の場合、エラーメッセージを表示
    const inputTodo: string = inputVal.trim();
    if (inputTodo == "") {
      setInputErrorFlg(true);
      return;
    }
    setInputVal(inputTodo);

    // エラーがない場合、追加を行う
    const payload: Todo = {
      id: Math.floor(Math.random() * 1e3),
      text: inputTodo,
      priority: selectVal,
    };
    dispatch?.({ type: "create", payload: payload });

    // 登録後に入力値初期化＋モーダル閉
    setInputVal("");
    setSelectVal(0);
    handleClose();
    setInputErrorFlg(false);
  };

  // モーダルの開閉
  const handleOpen = () => {
    setIsOpen((prev) => !prev);
  };
  const handleClose = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <Button
        startIcon={<AddIcon />}
        color="inherit"
        sx={{ fontWeight: "bold" }}
        onClick={handleOpen}
      >
        追加
      </Button>
      <Modal
        open={isOpen}
        onClose={handleOpen}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
        sx={{ textAlign: "center" }}
      >
        <Box sx={{ ...style, width: 300 }}>
          <CloseButton onClick={handleClose} />
          <h3
            id="child-modal-title"
            className="margin0-5-5-5"
          >
            新規にTodoを追加
          </h3>

          <form
            action="post"
            onSubmit={(e) => {
              e.preventDefault();
              addTodo();
            }}
          >
            <Input
              inputVal={inputVal}
              setInputVal={setInputVal}
            />
            <InputError inputErrorFlg={inputErrorFlg} />

            <br />
            <Radio
              selectVal={selectVal}
              setSelectVal={setSelectVal}
            />
            <SubmitButton title="追加する" />
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default AddModal;
