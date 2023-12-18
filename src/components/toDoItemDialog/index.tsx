import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React from "react";
import { ToDoItem } from "../../store/todo";
import moment from "moment";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface Props {
  open: boolean;
  handleClose: () => void;
  toDoItem: ToDoItem | null;
}

const toDodateTimeFormat = "dddd MM,YYYY  hh:mmA";

const ToDoItemDialog = (props: Props) => {
  const { open, handleClose, toDoItem } = props;

  if (toDoItem) {
    return (
      <Dialog
        className="w-100"
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle> {toDoItem.title} </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-slide-description"
            className="mb-3"
          >
            {toDoItem.description}
          </DialogContentText>
          <DialogContentText id="alert-dialog-slide-description">
            Created At: {moment(toDoItem.createdAt).format(toDodateTimeFormat)}
          </DialogContentText>
          {toDoItem.finishedAt && (
            <DialogContentText id="alert-dialog-slide-description">
              Finished At:{" "}
              {moment(toDoItem.finishedAt).format(toDodateTimeFormat)}
            </DialogContentText>
          )}
          {toDoItem.archivedAt && (
            <DialogContentText id="alert-dialog-slide-description">
              Archived At:{" "}
              {moment(toDoItem.archivedAt).format(toDodateTimeFormat)}
            </DialogContentText>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    );
  }
};

export default ToDoItemDialog;
