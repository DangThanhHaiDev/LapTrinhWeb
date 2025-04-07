import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Modal, Select, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import CreateIcon from '@mui/icons-material/Create';
import axios from "axios";
import url from "../../../config/Config";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 900,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const FoodUpdateModal = ({ open, handleClose, food, categories, isUpdate }) => {

    const [foodName, setFoodName] = useState("")
    const [priceListed, setPriceListed] = useState(0)
    const [priceCustom, setPriceCustom] = useState(0)
    const [unit, setUnit] = useState("")
    const [status, setStatus] = useState("")
    const [type, setType] = useState('');
    const [imageActive, setImageActive] = useState("")
    const [file, setFile] = useState()
    const [message, setMessage] = useState("")
    const [isSuccess, setIsuccess] = useState(false)
    const [isSuccessUpdate, setIsSuccessUpdate] = useState(false)


    useEffect(() => {
        if (food && isUpdate) {
            setFoodName(food.foodName)
            setPriceListed(food.priceListed)
            setPriceCustom(food.priceCustom)
            setUnit(food.unit)
            setStatus(food.status)
            setType(food.categoryId)
            setImageActive(food.imageUrl)
            setFile(food.imageUrl)
            setIsuccess(false) 
            setIsSuccessUpdate(false) 
            setFile(base64ToFile(food.imageUrl))
                      
        } else {
            resetModal()
        }
    }, [open])

    const base64ToFile = (base64String, fileName, mimeType = 'image/png') => {
        const byteString = atob(base64String.split(',')[1]);
        const byteArray = new Uint8Array(byteString.length);
      
        for (let i = 0; i < byteString.length; i++) {
          byteArray[i] = byteString.charCodeAt(i);
        }
      
        return new File([byteArray], fileName, { type: mimeType });
      }

    const resetModal = () => {
        setFoodName("")
        setPriceCustom("")
        setPriceCustom("")
        setUnit("")
        setStatus("")
        setImageActive("")
        setFile()
        setImageActive()
    }

    const handleChange = (event) => {
        setType(event.target.value);
    };

    const handleOnChange = (value, callback) => {
        callback(value)
    }

    const handleChooseFile = (e) => {
        setImageActive(URL.createObjectURL(e.target.files[0]))
        setFile(e.target.files[0])
    }

    const handleAddFood = async () => {
        if (!validateFood()) {
            return
        }
        if (!imageActive) {            
            return;
        }
        const reader = new FileReader();
        reader.onload = async () => {
            try {
                const request = {
                    foodName,
                    priceListed,
                    priceCustom,
                    unit,
                    categoryId: type,
                    imageUrl: reader.result
                };
                const response = await axios.post("http://localhost:5248/api/Food/add-food-item", request);
                console.log(response);
                setIsuccess(true)

            } catch (error) {
                console.error("Error uploading food:", error);
            }
        };

        reader.onerror = (error) => {
            console.error("Error reading file:", error);
        };

        reader.readAsDataURL(file);
        resetModal()
    };

    const handleUpdateFood = async () => {
        if (!validateFood()) {
            return
        }
        if (!imageActive) {            
            return;
        }
        const reader = new FileReader();
        reader.onload = async () => {
            try {
                const request = {
                    foodName,
                    priceListed,
                    priceCustom,
                    unit,
                    categoryId: type,
                    imageUrl: reader.result,
                    status,
                    foodItemId: food.foodItemId
                };
                const response = await axios.put(`${url}/api/Food/update-food-item/${food.foodItemId}`, request);
                console.log(response);
                setIsSuccessUpdate(true)
                
            } catch (error) {
                console.error("Error uploading food:", error);
            }
        };

        reader.onerror = (error) => {
            console.error("Error reading file:", error);
        };

        reader.readAsDataURL(file);
        resetModal()
    };

    const validateFood = () => {
        setIsuccess(false)
        setMessage("")
        if (!foodName.trim() || !priceCustom || !priceCustom || !unit.trim() || !type || !status.trim()) {
            setMessage("Vui lòng nhập đầy đủ thông tin")
            
            return false
        }
        if (isNaN(priceCustom+"".trim()) || isNaN(priceListed+"".trim())) {
            setMessage("Giá tiền không hợp lệ")
            return false
        }
        if (!file) {
            setMessage("Vui lòng chọn ảnh của món ăn")
            return false
        }
        if(priceCustom > priceListed || priceCustom < 0 || priceListed < 0){
            setMessage("Tiền bạn nhập chưa hợp lý")
            return false
        }
        return true
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
                    <Grid container>
                        <Grid item xs={6}>
                            <label htmlFor="image" className="p-2 bg-blue-600 text-white cursor-pointer hover:opacity-70 active:opacity-50 rounded-md">Chọn ảnh</label>
                            <input type="file" id="image" hidden accept="image/*" onChange={e => handleChooseFile(e)} />
                            <img src={imageActive} alt="" className="w-[90%] h-[90%] mt-2" />
                        </Grid>
                        <Grid item xs={6}>
                            <div>
                                <h1 className="text-xl font-semibold">Thông tin món ăn</h1>
                                <div className="mt-10">
                                    <TextField fullWidth label="Tên món" value={foodName} onChange={(e) => handleOnChange(e.target.value, setFoodName)} />
                                </div>
                                <div className="mt-3">
                                    <TextField fullWidth label="Giá mặc định" value={priceListed} onChange={(e) => handleOnChange(e.target.value, setPriceListed)} />
                                </div>
                                <div className="mt-3">
                                    <TextField fullWidth label="Giá bán" value={priceCustom} onChange={(e) => handleOnChange(e.target.value, setPriceCustom)} />
                                </div>
                                <div className="mt-3">
                                    <TextField fullWidth label="Đơn vị" value={unit} onChange={(e) => handleOnChange(e.target.value, setUnit)} />
                                </div>
                                <div className="mt-3">
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Loại món ăn</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={type}
                                            label="Loại món ăn"
                                            onChange={(e) => handleChange(e)}
                                        >
                                            {
                                                categories?.map((item) => (
                                                    <MenuItem value={item.categoryId}>{item.categoryName}</MenuItem>

                                                ))
                                            }
                                        </Select>
                                    </FormControl>
                                </div>
                                <div className="mt-3">
                                    <TextField fullWidth label="Tình trạng món ăn" value={status} onChange={(e) => handleOnChange(e.target.value, setStatus)} />
                                </div>
                                <div>
                                    {
                                        message &&
                                        <p className="text-red-800">{message}</p>

                                    }
                                    {
                                        isSuccess &&
                                        <p className="text-green-800">Bạn đã thêm sản phẩm thành công</p>
                                    }
                                    {
                                        isSuccessUpdate &&
                                        <p className="text-green-800">Bạn đã sửa sản phẩm thành công</p>
                                    }
                                </div>
                                <div className="text-right space-x-2 mt-5">
                                    <Button variant="contained" sx={{ bgcolor: "red" }} onClick={handleClose}>Hủy</Button>
                                    {isUpdate ?
                                        <Button variant="contained" sx={{ bgcolor: "blue" }} onClick={handleUpdateFood}>Xác nhận</Button>
                                        :
                                        <Button variant="contained" sx={{ bgcolor: "blue" }} onClick={handleAddFood}>Thêm</Button>

                                    }
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>
        </div>
    )
}

export default FoodUpdateModal