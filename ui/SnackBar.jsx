import * as React from 'react';
import { Snackbar, Alert, Button, Slide } from '@mui/material';

function Notification(props) {
  const { onClose, open, message } = props;

  const vertical = 'bottom'
  const horizontal = 'right'

  return (
    <Snackbar open={open} autoHideDuration={4000} onClose={() => onClose()}
      TransitionComponent={Slide}
      anchorOrigin={{ vertical, horizontal }}
    > <Alert
        onClose={() => onClose()}
        severity={message.severity} // warning // error // success
        variant="filled"
        sx={{ width: '100%' }}
      >{message.text}</Alert>
    </Snackbar>
  );
}

export default function SimpleDialogDemo() {
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState({ text: "", severity: "" });

  const handleClickOpen = () => {
    setMessage({ text: "Are you sure you want to delete this item?", severity: "error" })
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setMessage({ text: "", severity: "" })
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open simple dialog
      </Button>
      <Notification
        message={message}
        open={open}
        onClose={handleClose}
      />
    </div>
  );
}