import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NotFound, AddEditToDo, TodoList } from "./pages";
import Layout from "./layout";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "./store";

function App() {
  const { isDarkMode } = useSelector((state: RootState) => state.theme);

  const darkTheme = createTheme({
    palette: {
      mode: isDarkMode ? "dark" : "light",
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<AddEditToDo />} />
            <Route path="edit/:id" element={<AddEditToDo />} />
            <Route path="all-todos" element={<TodoList />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
