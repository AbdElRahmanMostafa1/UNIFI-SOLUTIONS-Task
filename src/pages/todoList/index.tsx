import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { ToDoCardItem, ToDoItemDialog } from "../../components";
import { ToDoItem } from "../../store/todo";
import { FormControl, MenuItem, Select, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const TodoList = () => {
  const [selectedToDo, setSelectedToDo] = useState<ToDoItem | null>(null);
  const [filterToDos, setFilterToDos] = useState<
    "all" | "archived" | "nonArchived"
  >("nonArchived");

  const { allToDos } = useSelector((state: RootState) => state.toDo);

  const filteredToDos = useMemo(() => {
    if (filterToDos === "all") {
      return allToDos;
    } else if (filterToDos === "nonArchived") {
      return allToDos.filter((toDo) => !toDo.archivedAt);
    } else if (filterToDos === "archived") {
      return allToDos.filter((toDo) => toDo.archivedAt);
    }
  }, [filterToDos, allToDos]);

  if (allToDos.length === 0) {
    return (
      <section className="d-flex justify-content-center">
        <article className="text-center">
          <Typography fontWeight={"700"} className="mb-2">
            No To Dos Yet!
          </Typography>
          <Link to={"/"}>+Add One</Link>
        </article>
      </section>
    );
  }

  return (
    <>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <Select
          value={filterToDos}
          onChange={(e) =>
            setFilterToDos(e.target.value as "all" | "archived" | "nonArchived")
          }
        >
          <MenuItem value={"all"}>All</MenuItem>
          <MenuItem value={"archived"}>Archived</MenuItem>
          <MenuItem value={"nonArchived"}>Non Archived</MenuItem>
        </Select>
      </FormControl>

      {filteredToDos?.map((toDo) => (
        <ToDoCardItem
          key={toDo.id}
          toDoItem={toDo}
          setSelectedToDo={setSelectedToDo}
        />
      ))}

      <ToDoItemDialog
        toDoItem={selectedToDo}
        open={!!selectedToDo}
        handleClose={() => setSelectedToDo(null)}
      />
    </>
  );
};

export default TodoList;
