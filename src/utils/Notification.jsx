import { Alert, Slide, Snackbar } from "@mui/material";
import { useState, forwardRef, useImperativeHandle } from "react";
import { PropTypes } from "prop-types";

const Notification = forwardRef(({ onClose, closeTimeoutSeconds }, ref) => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState({
        severity: "",
        text: "",
    })

    const vertical = 'bottom'
    const horizontal = 'right'

    const closePopup = () => {
        setOpen(false);
        setMessage({ severity: "", text: "" });
        onClose();
    }

    useImperativeHandle(ref, () => ({
        openPopup(severity, text) {
            setMessage({ severity, text });
            setOpen(true);
        }
    }))

    return (
        <Snackbar open={open} autoHideDuration={closeTimeoutSeconds * 1000} onClose={() => closePopup()}
            TransitionComponent={Slide}
            anchorOrigin={{ vertical, horizontal }}
        > <Alert
            onClose={() => closePopup()}
            severity={message.severity} // warning // error // success
            variant="filled"
            sx={{ width: '100%' }}
            >{message.text}</Alert>
        </Snackbar>
    )
})

Notification.defaultProps = {
    onClose: () => { },
    closeTimeoutSeconds: 3,
}

Notification.propTypes = {
    onClose: PropTypes.func,
    closeTimeoutSeconds: PropTypes.number,
}

export default Notification