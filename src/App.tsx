import { Container } from "@mui/material";

import "./App.css";
import Header from "./components/Header";
import TodoList from "./components/TodoList";
import { TodoProvider } from "./contexts/TodoContext";

/**
 * App コンポーネント
 *  main.tsxから呼び出されている親コンポーネント
 *
 * @returns {JSX.Element}
 */
const App = (): JSX.Element => {
  return (
    <>
      <TodoProvider>
        <Header />
        <div className="app">
          <Container maxWidth="sm">
            <TodoList />
          </Container>
        </div>
      </TodoProvider>
    </>
  );
};

export default App;
