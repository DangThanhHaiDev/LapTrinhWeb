import { Box, Button, Modal, TextField } from "@mui/material"
import { useEffect, useState } from "react";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

const PasswordChangeModal = ({ open, handleClose, handConfirmChangePassword }) => {
    const [password, setPassword] = useState("")
    const [passwordConfirm, setPasswordConfirm] = useState("")
    const [err, setErr] = useState("")

    useEffect(()=>{
        setErr("")
    }, [open])

    const handleClickConfirm = () => {
        setErr("")
        if (password.length < 8) {
            setErr("Mật khẩu phải lớn hơn 8 ký tự")
            return
        }
        if (password !== passwordConfirm) {
            setErr("Mật khẩu không trùng nhau")
            return
        }
        handConfirmChangePassword(password)
    }

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <h1 className="text-xl font-semibold">Thay đổi mật khẩu</h1>
                    <div className="mt-5 space-y-5">
                        <TextField fullWidth label="Nhập mật khẩu mới" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <TextField fullWidth label="Xác nhận mật khẩu" type="password" value={passwordConfirm} onChange={e => setPasswordConfirm(e.target.value)} />

                    </div>
                    <p className="text-left text-red-700">{err && err}</p>

                    <div className="text-right mt-5">
                        <Button sx={{ color: "red" }} onClick={handleClose}>Hủy</Button>
                        <Button onClick={handleClickConfirm}>Xác nhận</Button>

                    </div>
                </Box>
            </Modal>
        </div>
    )
}

export default PasswordChangeModal