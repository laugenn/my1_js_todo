import { Tab } from "@mui/material";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";

import { useEffect, useRef, useState } from "react";

import { useTodo } from "../contexts/TodoContext";
import { radioOption } from "../enums/Enum";
import { RadioOption, TodoData } from "../types/TodoType";
import CustomTabPanel from "./CustomTabPanel";

/**
 * TodoList コンポーネント
 *
 * @returns {React.ReactElement}
 */
const TodoList: React.FC = () => {
  // 押下したタブ状態
  const [selectTabVal, setSelectTabVal] = useState<number>(0);
  // todoリストの状態を取得
  const stateList: TodoData[] = useTodo();
  // 変更前のtodoリスト状態
  const prevStateRef = useRef<TodoData[] | null>(null);

  // タブ切り替え
  const handleChange = (_: React.SyntheticEvent | null, newValue: number) => {
    setSelectTabVal(newValue);
  };

  // todoリスト更新時に、最新の優先度タブ切り替え＋ストレージ保持
  useEffect(() => {
    if (prevStateRef.current === null) {
      prevStateRef.current = { ...stateList };
    }

    if (prevStateRef.current !== stateList) {
      for (let index = 0; index <= radioOption.length - 1; index++) {
        if (selectTabVal === index) {
          continue;
        }
        if (
          prevStateRef.current[index].todos.length !==
          stateList[index].todos.length
        ) {
          handleChange(null, index);
          break;
        }
      }
    }

    prevStateRef.current = { ...stateList };
    sessionStorage.setItem("todo", JSON.stringify(prevStateRef.current));
  }, [stateList]);

  return (
    <>
      <Box sx={{ width: "100%" }}>
        {/* 優先度タブ */}
        <Box sx={{ borderBottom: 1, BorderColor: "divider" }}>
          <Tabs
            value={selectTabVal}
            onChange={handleChange}
          >
            <Tab
              value={0}
              label={getTabName(0)}
              sx={{
                color: "#FFFFFF",
                background: "#adf0ef",
                fontWeight: "bold",
              }}
            />
            <Tab
              value={1}
              label={getTabName(1)}
              sx={{
                color: "#FFFFFF",
                background: "#FFD700",
                fontWeight: "bold",
              }}
            />
            <Tab
              value={2}
              label={getTabName(2)}
              sx={{
                color: "#FFFFFF",
                background: "#FF0000",
                fontWeight: "bold",
              }}
            />
          </Tabs>
        </Box>

        {/* 各todo情報 */}
        {stateList.map((list) => (
          <CustomTabPanel
            key={Math.random()}
            selectTabIndex={selectTabVal}
            TodoList={list.todos}
          />
        ))}
      </Box>
    </>
  );
};

/**
 * タブ表示名を取得する Function
 *
 * @param {val} - 0, 1, 2
 * @returns {string} タブに表示する優先順位のテキスト
 */
const getTabName = (val: number): string => {
  const value: RadioOption = radioOption.find((opt) => opt.id === val)!;
  return value.text;
};

export default TodoList;
