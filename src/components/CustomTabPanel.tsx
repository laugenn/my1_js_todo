import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";

import React from "react";

import { useTodoDispatch } from "../contexts/TodoContext";
import { Todo } from "../types/TodoType";
import EditModal from "./modals/EditModal";

interface TabPanelProps {
  selectTabIndex: number;
  TodoList: Todo[];
}

/**
 * CustomTabPanel コンポーネント
 * 取得したtodo一覧を表示する
 *
 * @param {Object} props
 * @param {number} props.selectTabIndex - 表示する優先順位のタブID
 * @param {Todo[]} props.TodoList - 優先順位に紐づけられているTodoリスト
 * @returns {React.ReactElement}
 */
const CustomTabPanel: React.FC<TabPanelProps> = (props: TabPanelProps) => {
  // タブとTodoリストを取得
  const { selectTabIndex, TodoList } = props;
  // dispatch関数を取得
  const dispatch = useTodoDispatch();

  // 削除ボタン押下時
  const deleteTodo = (todo: Todo) => {
    // NGの場合、処理終了
    const confirmResult = confirm(`Todo: ${todo.text}を削除してもいいですか？`);
    if (!confirmResult) {
      return;
    }

    // 削除対象が見当たらない場合、処理終了
    const targetTodo = TodoList.find((t) => t.id == todo.id);
    if (targetTodo == undefined) {
      return;
    }
    dispatch?.({ type: "delete", payload: { ...todo } });
  };

  return (
    <>
      {TodoList.length != 0 ? (
        <table>
          <tbody>
            {TodoList.map((todo) => {
              if (todo.priority === selectTabIndex) {
                return (
                  <tr key={Math.random()}>
                    <td className="width70">
                      <p>
                        {todo.text.length > 15
                          ? todo.text.substring(0, 14) + "..."
                          : todo.text}
                      </p>
                    </td>
                    <td className="width15">
                      <EditModal todo={todo} />
                    </td>
                    <td className="width15">
                      <Button
                        startIcon={<DeleteIcon />}
                        color="inherit"
                        sx={{ fontWeight: "bold" }}
                        onClick={() => deleteTodo(todo)}
                      >
                        削除
                      </Button>
                    </td>
                  </tr>
                );
              }
            })}
          </tbody>
        </table>
      ) : (
        ""
      )}
    </>
  );
};

export default CustomTabPanel;
