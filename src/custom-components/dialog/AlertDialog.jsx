import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { memo } from "react";

export function AlertDialog ({
    open,
    msg,
    setOpen,
    maxWidth
}) {
    if(maxWidth === undefined) {
        maxWidth = "sm";
    }
   // const [open, setOpen] = useState(false);
    const dialogClose = () => {
        setOpen(false);
    }
    return(

        <Dialog fullWidth maxWidth={maxWidth} open={open} onClose={dialogClose}>
            <DialogTitle>확인창</DialogTitle>
            <DialogContent>
            <DialogContentText>
                {msg}
            </DialogContentText>
            {/* <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Email Address"
                type="email"
                fullWidth
                variant="standard"
            /> */}
            </DialogContent>
            <DialogActions>
            <Button onClick={dialogClose}>확인</Button>
            {/* <Button onClick={dialogClose}>Subscribe</Button> */}
            </DialogActions>
        </Dialog>

    )
}

export default memo(AlertDialog);