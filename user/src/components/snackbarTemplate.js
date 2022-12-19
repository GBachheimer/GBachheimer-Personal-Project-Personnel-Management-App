import { Snackbar, Alert } from "@mui/material";
export default function SnackbarTemplate(props) {
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        props.handleSnackBar();
    };

    return (
      <Snackbar open={props.open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={props.severity} sx={{ width: '100%' }}>
          {props.message}
        </Alert>
      </Snackbar>
    );
}