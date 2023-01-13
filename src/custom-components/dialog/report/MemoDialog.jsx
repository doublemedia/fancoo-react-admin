import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Stack, Typography } from "@mui/material";
import { memo } from "react";

export function MemoDialog({
    msg,
    open,
    setOpen,
    setMsg
}) {
    const dialogClose = () => {
        setOpen(false);
        setMsg('');
    }
    return (
        <Dialog fullWidth maxWidth='sm' open = {open} onClose = {dialogClose}>
            <DialogTitle>메모</DialogTitle>
            <DialogContent>
                <Typography variant="subtitle" mt={1}>
                    {msg}
                </Typography>
                
            </DialogContent>
            <DialogActions>
                <Button onClick={dialogClose}>확인</Button>
            </DialogActions>
        </Dialog>
    )
}

export default memo(MemoDialog);