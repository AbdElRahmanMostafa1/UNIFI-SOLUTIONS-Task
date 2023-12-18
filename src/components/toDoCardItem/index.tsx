import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import React from "react";
import {
  ToDoItem,
  archiveToDoItem,
  deleteToDoItem,
  toggleToDoCheck,
} from "../../store/todo";
import { useAppDispatch } from "../../store";
import moment from "moment";
import { useNavigate } from "react-router-dom";

interface Props {
  toDoItem: ToDoItem;
  setSelectedToDo?: (toDoItem: ToDoItem) => void;
}

const ToDoCardItem = (props: Props) => {
  const { toDoItem, setSelectedToDo } = props;
  const { title, description, checked, id, createdAt, archivedAt } = toDoItem;

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const renderedTitle =
    title.length > 20 ? `${title.substring(0, 20)}...` : title;

  const stopPropagationWrapper =
    (callback: (e: React.MouseEvent) => void) => (e: React.MouseEvent) => {
      e.stopPropagation();
      callback && callback(e);
    };

  return (
    <Card
      className="mb-2"
      onClick={() => setSelectedToDo && setSelectedToDo(toDoItem)}
    >
      <CardActionArea>
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="p"
            style={{
              textDecoration: checked ? "line-through" : "none",
            }}
          >
            {renderedTitle}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            style={{
              textDecoration: checked ? "line-through" : "none",
            }}
          >
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className="justify-content-between flex-wrap">
        <div>
          <Typography>
            Created On: {moment(createdAt).format("DD MMM, YYYY - hh:mmA")}
          </Typography>
        </div>
        <div>
          <Button
            size="small"
            color="primary"
            onClick={stopPropagationWrapper(
              () => setSelectedToDo && setSelectedToDo(toDoItem)
            )}
          >
            Show Details
          </Button>
          <Button
            size="small"
            color="primary"
            onClick={stopPropagationWrapper(
              () => id && dispatch(toggleToDoCheck(id))
            )}
          >
            {checked ? "Un Check" : "Check"}
          </Button>
          {!archivedAt && (
            <Button
              size="small"
              color="primary"
              onClick={stopPropagationWrapper(
                () => id && dispatch(archiveToDoItem(id))
              )}
            >
              Archive
            </Button>
          )}
          <Button
            size="small"
            color="info"
            onClick={() => {
              navigate({
                pathname: `/edit/${id}`,
              });
            }}
          >
            Edit
          </Button>
          <Button
            size="small"
            color="error"
            onClick={stopPropagationWrapper(
              () => id && dispatch(deleteToDoItem(id))
            )}
          >
            Delete
          </Button>
        </div>
      </CardActions>
    </Card>
  );
};

export default ToDoCardItem;
