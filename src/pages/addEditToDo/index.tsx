import { Button, Grid, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ErrorText } from "../../components/shared";
import { ToDoItem, addToDoItem, editToDo } from "../../store/todo";
import { RootState, useAppDispatch } from "../../store";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

interface AddEditToDoInputsType {
  title: string;
  description: string;
}

const AddEditToDo = () => {
  const [itemToEdit, setItemToEdit] = useState<ToDoItem | null>(null);

  const { allToDos } = useSelector((state: RootState) => state.toDo);
  const dispatch = useAppDispatch();
  const params = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm<AddEditToDoInputsType>();

  const addToDoItemHandler: SubmitHandler<AddEditToDoInputsType> = (data) => {
    const payload: ToDoItem = {
      title: data.title,
      description: data.description,
      checked: false,
      archivedAt: "",
      createdAt: Date.now(),
      finishedAt: "",
    };
    dispatch(addToDoItem(payload));
    reset();
  };

  const editToDoItemHandler: SubmitHandler<AddEditToDoInputsType> = (data) => {
    const payload: ToDoItem = {
      ...itemToEdit,
      title: data.title,
      description: data.description,
    };
    dispatch(editToDo(payload));
    reset();
    navigate("/all-todos");
  };

  useEffect(() => {
    if (params.id) {
      const desiredToDo = allToDos.find(
        (toDo) => toDo.id?.toString() === params?.id
      );
      if (desiredToDo) {
        setItemToEdit(desiredToDo!);
        setValue("title", desiredToDo.title);
        setValue("description", desiredToDo.description);
      }
    } else {
      setItemToEdit(null);
    }
  }, [params.id]);

  return (
    <form
      onSubmit={
        itemToEdit
          ? handleSubmit(editToDoItemHandler)
          : handleSubmit(addToDoItemHandler)
      }
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            id="outlined-basic"
            label="Title"
            variant="outlined"
            {...register("title", {
              required: {
                value: true,
                message: "Please Add Title",
              },
            })}
            fullWidth
          />
          {errors?.title && <ErrorText text={errors.title.message} />}
        </Grid>

        <Grid item xs={12}>
          <TextField
            id="outlined-multiline-static"
            label="Description"
            multiline
            rows={4}
            {...register("description", {
              required: {
                value: true,
                message: "Please Add Description",
              },
            })}
            fullWidth
          />
          {errors?.description && (
            <ErrorText text={errors.description.message} />
          )}
        </Grid>
      </Grid>

      <Button className="mt-3 px-5 py-3" variant="contained" type="submit">
        {itemToEdit ? "Edit" : "Save"}
      </Button>
    </form>
  );
};

export default AddEditToDo;
