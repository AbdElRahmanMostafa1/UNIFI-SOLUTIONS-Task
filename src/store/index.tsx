import { configureStore } from "@reduxjs/toolkit";
import toDoReducer from "./todo";
import themeReducer from "./theme";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    toDo: toDoReducer,
    theme: themeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
