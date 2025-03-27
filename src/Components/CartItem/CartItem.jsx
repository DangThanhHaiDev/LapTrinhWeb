import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteItemToCart } from '../../GlobalState/Cart/Action';


const CartItem = ({ cartItem, index }) => {    

    const [price, setPrice] = useState(0)
    const dispatch = useDispatch()
    const {items} = useSelector(state=>state.cartReducer)
    

    useEffect(()=>{
        getTotalPrice()
    }, [items])

    const getTotalPrice = ()=>{
        let total = 0
        total += cartItem.priceCustom * cartItem.quantity
        console.log(total);
        
        if(cartItem.extraFood.length > 0){
            total = cartItem.extraFood.reduce((sum, item)=>sum+(item.quantity+1)* item.price, total)
        }
        setPrice(total)
    }

    const handleDelItem = ()=>{
        dispatch(deleteItemToCart(index))
    }

    return (
        <div>
            <div className='text-white flex justify-between items-center text-xs shadow-2xl px-5 py-3'>
                <div className='flex items-center space-x-2'>
                    <img src={cartItem.imageUrl} alt="Ảnh" className="w-16 h-16" />
                    <div className='flex flex-col space-y-2 text-left'>
                        <p>{cartItem.foodName}</p>
                        <p>{cartItem.quantity} phần</p>
                        {
                            cartItem.extraFood.length > 0
                            && cartItem.extraFood.map((item, index) => (
                                <>
                                    <div>
                                        <p>{item.foodName} x {item.quantity+1}</p>
                                    </div>
                                </>
                            ))
                        }
                    </div>
                </div>
                <div className='space-y-2'>
                    <p>{Number(price).toLocaleString("vi-vn")} đ</p>
                    <div className='flex items-center space-x-2'>
                        <BorderColorIcon fontSize='small' sx={{ color: "blue" }} className='cursor-pointer' />
                        <DeleteIcon fontSize='small' sx={{ color: "red" }} className='cursor-pointer' onClick={e=>handleDelItem(index)}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartItem