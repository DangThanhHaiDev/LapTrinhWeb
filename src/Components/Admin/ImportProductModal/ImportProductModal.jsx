import { Box, Button, Modal, TextField } from "@mui/material"
import axios from "axios";
import { useEffect, useState } from "react";
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
const ImportProductModal = ({open, handleClose, product}) => {
    const [productNumber, setProductNumber] = useState(0)
    const [message, setMessage] = useState("")

    useEffect(()=>{
        setMessage("")
        setProductNumber(0)
        console.log(product);
        
    }, [open])

    const addProductNumber  = async()=>{
        setMessage("")
        if(productNumber <= 0){
            setMessage("Số lượng bạn vừa nhập không hợp lệ")
            return
        }
        try {
            const response = await axios.post(`${url}/api/Inventory/update-quantity-material`, {materialId: product.materialId, addedQuantity:productNumber})
            const {data} = response
            console.log(data);
            handleClose()
            alert("Bạn đã cập nhật số lượng thành công")
            
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
                   <h1 className="text-xl font-semibold">Thêm hàng</h1>
                   <div className="mt-5 space-y-3">
                        <TextField fullWidth label="Nhập vào số lượng cần thêm" type="number" value={productNumber} onChange={(e)=>setProductNumber(e.target.value)}/>
                        {
                            message && <p className="text-red-700">{message}</p>
                        }
                        <div className="text-right">
                            <Button sx={{color:"red"}} onClick={handleClose}>Hủy</Button>
                            <Button onClick={addProductNumber}>Xác nhận</Button>
                        </div>
                   </div>
                </Box>
            </Modal>
        </div>
    )
}

export default ImportProductModal