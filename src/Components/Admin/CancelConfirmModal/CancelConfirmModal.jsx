import { Box, Button, Modal } from "@mui/material";
import axios from "axios";
import url from "../../../config/Config";

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
const CancelConfirmModal = ({ open, handleClose, product }) => {

    const cancelProduct = async () => {

        try {
            await axios.post(`${url}/api/Inventory/cancel-all-goods`, { materialId: product.materialId })
            alert("Bạn đã hủy thành công hàng này")
        } catch (error) {
            alert("Đã sảy ra lỗi, vui lòng thử lại sau")

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
                    <h1 className="text-xl font-semibold">Loại bỏ hàng</h1>
                    <div className="mt-5 space-y-3">
                        <p>Bạn có chăc muốn loại bỏ hàng này không</p>
                        <div className="text-right">
                            <Button sx={{ color: "red" }} onClick={handleClose}>Hủy</Button>
                            <Button onClick={cancelProduct}>Xác nhận</Button>
                        </div>
                    </div>
                </Box>
            </Modal>
        </div>
    )
}

export default CancelConfirmModal