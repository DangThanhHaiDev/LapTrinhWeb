import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { Checkbox, FormControlLabel, FormGroup, TextField } from '@mui/material';
import { useEffect } from 'react';
import axios from 'axios';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useDispatch } from "react-redux"
import { addItemToCart } from '../../GlobalState/Cart/Action.js';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    boxShadow: 24,
};

const FoodOrderModal = ({ open, handleClose, foodOrder }) => {

    const [extraFood, setExtraFood] = React.useState([])
    const [foodQuantity, setFoodQuantity] = React.useState(1)
    const [extraFoodActive, setExtraFoodActive] = React.useState([])
    const dispatch = useDispatch()

    useEffect(() => {
        getAllExTraFood()
    }, [])

    useEffect(() => {
        setFoodQuantity(1)
        resetExtraFood()
        resetExtrafoodActive()
    }, [open])

    const getAllExTraFood = async () => {
        try {
            const response = await axios.get("http://localhost:5248/api/Food/get-all-additional-food")
            let { data } = response
            data = data.filter((item) => (item.categoryId === foodOrder.categoryId))
            setExtraFood(data)
        } catch (error) {

        }
    }

    const handlePlusFood = () => {
        setFoodQuantity(foodQuantity + 1)
    }

    const handleDifferenceFood = () => {
        if (foodQuantity > 1) {
            setFoodQuantity(foodQuantity - 1)
        }
    }

    const handlePlusExtraFood = (extraFoodId) => {
        const newExtraFood = extraFood.map((item) => {
            if (item.id === extraFoodId) {
                return {
                    ...item,
                    quantity: item.quantity + 1
                }
            }
            return item
        })
        setExtraFood(newExtraFood)

    }

    const resetExtraFood = ()=>{
        const newExtraFood = extraFood.map((item)=>({...item, quantity:0}))
        setExtraFood(newExtraFood)
    }

    const resetExtrafoodActive = ()=>{
        setExtraFoodActive([])
    }

    const handleAddToCart = ()=>{
        const foodActive = extraFood.filter((item)=>(isExistedActive(item.id)))
        const food ={...foodOrder, quantity: foodQuantity, extraFood: foodActive}
        dispatch(addItemToCart(food))
        handleClose()
    }

    const isExistedActive = (id)=>{
        return extraFoodActive.find((item)=>(item.id === id))
    }

    const handleOnChangeChecked = (e, item)=>{
        if(e.target.checked){
            setExtraFoodActive([...extraFoodActive, item])
        }
        else{
            setExtraFoodActive(extraFoodActive.filter((f)=>(item.id!==f.id)))
        }
    }


    return (
        <div>
            <div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <div className='bg-[#212121] text-white p-5'>
                            <div>
                                <h1 className='text-xl shadow-md font-semibold'>Chi tiết món ăn</h1>
                                <div className='mt-5 flex items-center justify-between'>
                                    <div className='flex items-center space-x-2'>
                                        <img src={foodOrder.imageUrl} alt="Ảnh" className='w-16 h-16' />
                                        <div>
                                            <p>{foodOrder.foodName}</p>
                                            <p>{Number(foodOrder.priceCustom).toLocaleString("vi-vn")} VND</p>
                                        </div>
                                    </div>
                                    <div className='flex items-center space-x-2'>

                                        <div className=''>
                                            <input type="text" disabled className='w-10 h-10 text-center' value={foodQuantity} />
                                        </div>
                                        <div className='flex flex-col space-y-2'>
                                            <AddIcon sx={{ fontSize: "1.2rem", bgcolor: "#303030", borderRadius: "50%" }} className='cursor-pointer hover:opacity-70 active:opacity-50' onClick={handlePlusFood} />
                                            <RemoveIcon sx={{ fontSize: "1.2rem", bgcolor: "#303030", borderRadius: "50%" }} className={`${foodQuantity > 1 ? 'cursor-pointer hover:opacity-70 active:opacity-50' : 'opacity-30'}`} onClick={handleDifferenceFood} />
                                        </div>
                                    </div>

                                </div>
                                <div className='h-[1px] opacity-70 bg-white mt-5'></div>
                                <div className='mt-10'>
                                    <p className='text-lg'>Các món gọi thêm</p>
                                    <div>
                                        <FormGroup>
                                            <div className='flex justify-between items-center flex-wrap'>
                                                {
                                                    extraFood.length > 0 &&
                                                    extraFood.map((item) => (
                                                        <div className='flex w-[40%] items-center justify-between mt-5' key={item.id}>
                                                            <FormControlLabel control={<Checkbox onChange={(e)=>handleOnChangeChecked(e, item)} sx={{ "&.Mui-checked": { color: "white" } }} />} label={item.foodName + " - " + Number(item.price).toLocaleString("vi-vn") + " đ"} />
                                                            <div className='flex justify-center space-x-2'>
                                                                <input className='border w-10 h-10 p-3 flex justify-center items-center bg-[#303030] text-center' disabled value={item.quantity + 1} />

                                                                <div className='flex flex-col justify-between'>
                                                                    <AddIcon sx={{ fontSize: "1.2rem", bgcolor: "#303030", borderRadius: "50%" }} className='cursor-pointer hover:opacity-70 active:opacity-50' onClick={()=>handlePlusExtraFood(item.id)} />
                                                                    <RemoveIcon sx={{ fontSize: "1.2rem", bgcolor: "#303030", borderRadius: "50%" }} className={`${foodQuantity > 1 ? 'cursor-pointer hover:opacity-70 active:opacity-50' : 'opacity-30'}`} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))
                                                }


                                            </div>

                                        </FormGroup>
                                    </div>
                                </div>
                                <div className='mt-10'>
                                    <p className='text-lg'>Ghi chú</p>
                                    <TextField fullWidth multiline sx={{ bgcolor: "#2a2a2a", "& .MuiInputBase-input": { color: "white" } }} rows={5} />
                                </div>
                                <div className='text-right mt-5 space-x-2'>
                                    <Button variant='contained' sx={{ bgcolor: "red" }} onClick={handleClose}>Hủy</Button>
                                    <Button variant='contained' onClick={handleAddToCart}>Thêm vào giỏ</Button>
                                </div>
                            </div>
                        </div>
                    </Box>
                </Modal>
            </div>
        </div>
    )
}

export default FoodOrderModal