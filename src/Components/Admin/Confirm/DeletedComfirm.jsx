import { Box, Button, Modal } from "@mui/material";
import axios from "axios";


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


const DeletedConfirm = ({open, handleClose, foodId}) => {

    const handleDeleteFood = async()=>{
        try {
            await axios.delete(`http://localhost:5248/api/Food/delete-food-item/${foodId}`)
            alert("Bạn đã xóa thành công!")
            handleClose()
        } catch (error) {
            alert("Đã sảy ra lỗi. Vui lòng thử lại sau")
        }
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
                    <div>
                        <h1 className="text-xl font-semibold">Xác nhận</h1>
                        <p className="mt-5">Bạn có chắc muốn xóa món này không?</p>
                        <div className="text-right mt-3">
                            <Button onClick={handleClose}>Hủy</Button>
                            <Button sx={{color:"red"}} onClick={handleDeleteFood}>Xóa</Button>
                        </div>
                    </div>
                </Box>
            </Modal>
        </div>
    )
}

export default DeletedConfirm