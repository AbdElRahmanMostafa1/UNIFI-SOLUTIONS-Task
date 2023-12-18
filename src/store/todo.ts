import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface ToDoItem {
  id?: number;
  title: string;
  description: string;
  checked?: boolean;
  createdAt?: number;
  finishedAt?: number | string;
  archivedAt?: number | string;
}

export interface TodoState {
  allToDos: ToDoItem[];
}

const initialState: TodoState = {
  allToDos: [],
};

export const toDoSlice = createSlice({
  name: "toDo",
  initialState,
  reducers: {
    addToDoItem: (state, { payload }: PayloadAction<ToDoItem>) => {
      state.allToDos = [...state.allToDos, { ...payload, id: Date.now() }];
    },
    toggleToDoCheck: (state, { payload }: PayloadAction<number>) => {
      state.allToDos = state.allToDos.map((toDo: ToDoItem) =>
        toDo.id === payload
          ? {
              ...toDo,
              checked: !toDo.checked,
              finishedAt: !toDo.checked ? Date.now() : "",
            }
          : toDo
      );
    },
    deleteToDoItem: (state, { payload }: PayloadAction<number>) => {
      state.allToDos = state.allToDos.filter((toDo) => toDo.id !== payload);
    },
    archiveToDoItem: (state, { payload }: PayloadAction<number>) => {
      state.allToDos = state.allToDos.map((toDo) =>
        toDo.id === payload ? { ...toDo, archivedAt: Date.now() } : toDo
      );
    },
    editToDo: (state, { payload }: PayloadAction<ToDoItem>) => {
      state.allToDos = state.allToDos.map((toDo) =>
        toDo.id === payload.id ? { ...payload } : toDo
      );
    },
  },
});

export const {
  addToDoItem,
  toggleToDoCheck,
  deleteToDoItem,
  archiveToDoItem,
  editToDo,
} = toDoSlice.actions;

export default toDoSlice.reducer;
