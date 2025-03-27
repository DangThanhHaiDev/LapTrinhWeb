import { Button } from "@mui/material"
import { useState } from "react";
import FoodOrderModal from "../FoodOrderModal/FoodOrderModal";

const FoodCard = ({food})=>{

    const [openFoodOrderModal, setOpenFoodOrderModal] = useState(false);
    const handleOpen = () => setOpenFoodOrderModal(true);
    const handleClose = () => {
        setOpenFoodOrderModal(false)  
    };

    

    return (
        <div className="bg-[#303030] text-white px-2 py-4 space-y-3 max-w-[400px] shadow-lg border border-black">
            <div className=" w-full">
               <img src={food.imageUrl} alt="Ảnh" className="h-60 w-60 object-cover" />
            </div>
            <div>
                <p>{food.foodName.length > 30 ? food.foodName.substring(0, 25)+"..." : food.foodName}</p>
                <p className="line-through">{Number(food.priceListed).toLocaleString("vi-vn")} vnđ</p>
                <p>{Number(food.priceCustom).toLocaleString("vi-vn")} vnđ</p>
            </div>
            <div>
                <Button variant="contained" sx={{backgroundColor:"#f57c00"}} fullWidth onClick={handleOpen}>Thêm món</Button>
            </div>
            <FoodOrderModal open={openFoodOrderModal} handleClose={handleClose} foodOrder={food}/>
        </div>
    )
}

export default FoodCard