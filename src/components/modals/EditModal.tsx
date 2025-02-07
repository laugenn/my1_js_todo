import ModeEditIcon from "@mui/icons-material/ModeEdit";
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

interface EditModalProps {
  todo: Todo;
}

/**
 * EditModal コンポーネント
 * 編集するtodoをモーダル表示する
 *
 * @param {object} props
 * @param {Todo} props.todo - 選択したTodo情報
 * @returns {React.ReactElement}
 */
const EditModal: React.FC<EditModalProps> = (props: EditModalProps) => {
  // モーダルの開閉状態
  const [isOpen, setIsOpen] = useState<boolean>(false);
  // 入力値の状態
  const [inputVal, setInputVal] = useState<string>(props.todo.text);
  // Todo入力値のエラー判定
  const [inputErrorFlg, setInputErrorFlg] = useState<boolean>(false);
  // ラジオの状態
  const [selectVal, setSelectVal] = useState<number>(props.todo.priority);

  // dispatch関数を取得
  const dispatch = useTodoDispatch();

  // 変更ボタンを押下時、todoの状態を更新
  const editTodo = () => {
    // 空文字の場合、エラーメッセージを表示
    const editTodo: string = inputVal.trim();
    if (editTodo == "") {
      setInputErrorFlg(true);
      return;
    }

    // エラーがない場合、更新処理を行う
    const editState: Todo = {
      ...props.todo,
      text: inputVal,
      priority: selectVal,
    };
    dispatch?.({ type: "edit", payload: editState });
    // モーダル閉
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
        startIcon={<ModeEditIcon />}
        color="inherit"
        sx={{ fontWeight: "bold" }}
        onClick={handleOpen}
      >
        編集
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
            既存のTodoを変更
          </h3>

          <form
            action="post"
            onSubmit={(e) => {
              e.preventDefault();
              editTodo();
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
            <SubmitButton title="変更する" />
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default EditModal;
