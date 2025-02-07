import React, { createContext, useContext, useReducer } from "react";

import { ActionType, RadioTextName } from "../enums/Enum";
import { TodoAction, TodoData } from "../types/TodoType";

interface TodoProps {
  children: React.ReactNode;
}

// 各優先順位ごとのTodoリスト（初期値）
const initTodoList = [
  { name: RadioTextName.FREE, todos: [] },
  { name: RadioTextName.IMPORTANT, todos: [] },
  { name: RadioTextName.EMERGENCY, todos: [] },
];

/**
 * タブ表示名を取得する Function
 *
 * @param {number} val - 0, 1, 2
 * @returns {string} Enum.RadioTextNameをもとに紐づく文字列
 */
const getNameBySelectedVal = (val: number): string => {
  // いつでも
  if (val == 0) {
    return RadioTextName.FREE;
  }
  // 優先
  if (val == 1) {
    return RadioTextName.IMPORTANT;
  }
  // 緊急
  if (val == 2) {
    return RadioTextName.EMERGENCY;
  }
  // エラー（異常）
  return RadioTextName.ERROR;
};

/**
 * reducer：Todoの状態の更新を行う
 *
 * @param {TodoData[]} state
 * @param {TodoAction} action
 * @returns {TodoData[]} state
 * @throws reducer.actionが既定以外の場合
 */
const reducer: React.Reducer<TodoData[], TodoAction> = (
  state,
  action,
): TodoData[] => {
  // 選択した優先順位のテキストを取得
  const radioName = getNameBySelectedVal(action.payload.priority);
  // stateの保持
  let newState;

  switch (action.type) {
    // Todo作成
    case ActionType.CREATE: {
      newState = state.map((todo) =>
        todo.name === radioName
          ? { ...todo, todos: [...todo.todos, action.payload] }
          : todo,
      );
      return newState;
    }

    // Todo編集
    case ActionType.EDIT: {
      // 変更前の優先度インデックスを取得
      const todoListIndex = state
        .map((todo) => todo.name === radioName)
        .findIndex((bool) => bool);

      // 変更されたtodo取得（取得できなかった場合、優先度が変更された）
      const targetTodoList = state[todoListIndex].todos.filter(
        (t) => t.id === action.payload.id,
      );

      // テキストのみ変更の場合（1件しか取得できない想定）
      if (
        targetTodoList.length !== 0 &&
        targetTodoList[0].id === action.payload.id
      ) {
        // 同じ優先度のリストのみ更新
        const updateTodo = state.map((todo) => {
          return todo.name === radioName
            ? todo.todos.map((t) =>
                t.id === action.payload.id ? { ...t, ...action.payload } : t,
              )
            : todo.todos;
        });

        // state更新
        newState = state.map((todo, index) =>
          todo.name === radioName
            ? { ...todo, todos: updateTodo[index] }
            : todo,
        );
        return newState;
      }

      // 優先順位も変更した場合、todoリスト全体から対象のtodoを取得
      const todoLists = state.map((todo) => {
        return todo.todos.filter((t) => t.id === action.payload.id);
      });

      // 全体のリストから優先順位ごとにstateを更新
      todoLists.forEach((t) => {
        // 取得できない場合は、次へ
        if (t.length == 0) {
          return;
        }

        // 変更前の優先度のみ、再度更新
        const prevRadioName = getNameBySelectedVal(t[0].priority);
        const newTodoLists = state[t[0].priority].todos.filter(
          (t) => t.id !== action.payload.id,
        );

        // stateを更新
        newState = state.map((todo) => {
          if (todo.name === prevRadioName) {
            // 変更前の優先度
            return { ...todo, todos: newTodoLists };
          } else if (todo.name === radioName) {
            // 変更後の優先度
            return { ...todo, todos: [...todo.todos, action.payload] };
          } else {
            return todo;
          }
        });
      });

      return newState || state;
    }

    // Todo削除
    case ActionType.DELETE: {
      // 削除先のTodoリストのインデックス番号を取得
      const deleteTodoIndex = state
        .map((todo) => todo.name === radioName)
        .findIndex((bool) => bool);

      // 同じ優先順位の中から今回対象のみ削除
      const newTodoLists = state[deleteTodoIndex].todos.filter(
        (t) => t.id !== action.payload.id,
      );

      // 新たにオブジェクトを生成し、stateを更新
      const newObj: TodoData = {
        name: radioName,
        todos: newTodoLists,
      };
      newState = state.map((todo) => (todo.name === radioName ? newObj : todo));
      return newState;
    }

    default: {
      throw Error("Unknown action");
    }
  }
};

/**
 * Todoの状態を共有するコンテキスト
 *
 */
const TodoContext = createContext<TodoData[]>([]);

/**
 * Todoの状態を更新する関数を共有するコンテキスト
 *
 */
const TodoDispatchContext = createContext<React.Dispatch<TodoAction> | null>(
  null,
);

/**
 * (Function)stateの初期化
 *
 * @returns {TodoData[]} 画面に表示するTodoList(初期値またはセッションから取得)
 * @throws parseError発生
 */
const createInitState = (): TodoData[] => {
  try {
    // セッションストレージからtodo情報を取得
    const jsonTodo: string | null = sessionStorage.getItem("todo");
    if (jsonTodo === null) {
      return initTodoList;
    }

    // 変換し、配列に格納
    const parsedObject: TodoData[] = JSON.parse(jsonTodo);
    const initState: TodoData[] = [];
    for (let index = 0; index < initTodoList.length; index++) {
      initState.push(parsedObject[index]);
    }
    return initState;
  } catch (error) {
    console.error(error);
    throw Error("ParseError");
  }
};

/**
 * TodoProvider コンポーネント
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - 子コンポーネント
 * @returns {React.ReactElement} Todo コンテキストプロバイダー
 */
const TodoProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer<
    React.Reducer<TodoData[], TodoAction>,
    TodoData[]
  >(reducer, initTodoList, createInitState);

  return (
    <>
      <TodoContext.Provider value={state}>
        <TodoDispatchContext.Provider value={dispatch}>
          {children}
        </TodoDispatchContext.Provider>
      </TodoContext.Provider>
    </>
  );
};

/**
 * Todoの状態を取得するフック
 *
 * @return {TodoData[]} - Todo状態の配列
 */
const useTodo = () => useContext<TodoData[]>(TodoContext);

/**
 * Todoの状態を更新する関数を取得するフック
 *
 * @return {React.Dispatch<TodoAction> | null} - dispatch関数
 */
const useTodoDispatch = () =>
  useContext<React.Dispatch<TodoAction> | null>(TodoDispatchContext);

export { TodoProvider, useTodo, useTodoDispatch };
