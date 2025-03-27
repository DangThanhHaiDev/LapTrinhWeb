import { Button } from "@mui/material"
import CartItem from "../CartItem/CartItem"
import "../HomePage/HomePage.scss"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import { resetCart } from "../../GlobalState/Cart/Action"


const Cart = () => {

    const { items } = useSelector(state => state.cartReducer)
    const [totalPrice, setTotalPrice] = useState(0)
    const dispatch = useDispatch()

    useEffect(() => {
        getTotalOrder()
    }, [items])
    console.log(items);


    const getTotalOrder = () => {
        let total = 0
        if (items.length > 0) {
            total = items.reduce((sum, item) => {
                sum += getToTalExtraFood(item.extraFood)
                return sum + Number(item.quantity) * Number(item.priceCustom)
            }, 0)
        }

        setTotalPrice(Number(total))
    }

    const getToTalExtraFood = (arr) => {
        if (arr.length === 0) {

            return 0
        }
        const total = arr.reduce((sum, item) => {
            return sum + Number(item.price) * (Number(item.quantity) + 1)
        }, 0)
        return total
    }

    const handleOrder = () => {
        if (items.length === 0) {
            alert("Vui lòng chọn món ăn trước khi đặt hàng")
            return
        }
        createOrder()
    }

    const createOrder = async () => {
        let user
        if (!(user = JSON.parse(localStorage.getItem("user")))) {
            return
        }

        const request = {
            userId: user.userId,
            orderTime: new Date().toISOString(),
            tableId: 1,
            totalAmount: totalPrice * (88 / 100) + totalPrice * (6 / 100),
            status: "paid",
            discount: 12,
            tax: 6
        }

        try {
            const response = await axios.post("http://localhost:5248/api/Food/add-order", request)
            const { data } = response
            

            items.map((item) => {
                const useData = {
                    orderId: data.data.orderId,
                    foodItemId: item.foodItemId,
                    foodName: item.foodName,
                    quantity: item.quantity,
                    price: item.priceCustom,
                    isMainItem: 1,
                    unit: item.unit,
                    note: "",
                    categoryId: item.categoryId,
                    orderTime: new Date().toISOString()
                }                
                addOrderItem(useData)
                if (item.extraFood.length > 0) {
                    item.extraFood.map((i) => {
                        const food = {
                            orderId: data.data.orderId,
                            foodItemId: i.id,
                            foodName: i.foodName,
                            quantity: i.quantity + 1,
                            price: i.price,
                            isMainItem: 0,
                            unit: i.unit,
                            note: "",
                            categoryId: i.categoryId,
                            orderTime: new Date().toISOString()
                        }                        
                        addOrderItem(food)
                        
                    })
                }
            })

            alert("Bạn đã đặt hàng thành công")
            dispatch(resetCart())
        } catch (error) {
            alert("Đã có vấn đề. Xin vui lòng thử lại")
        }
    }

    const addOrderItem = async (useData) => {
        try {
            await axios.post("http://localhost:5248/api/Food/add-order-item", useData)
        } catch (error) {

        }
    }

    return (
        <div className="bg-[#303030] border-r-amber-300">
            <div>
                <h1 className="text-white border-b pb-1">Các món đã chọn</h1>
            </div>
            <div className="h-[220px] overflow-scroll no-scrollbar">
                <div className="p-5">
                    {
                        items.length > 0 &&
                        items.map((item, index) => (
                            <CartItem key={index} cartItem={item} index={index} />
                        ))
                    }
                </div>
            </div>
            <div className="bg-[#3f41410d] p-5">
                <div className="bg-[#3f4141] shadow-md rounded-md p-5">
                    <p className="text-left font-semibold text-white">Tổng hóa đơn</p>
                    <div className="space-y-1">
                        <div className="flex justify-between text-white mt-3">
                            <p>Tổng tiền</p>
                            <p>{Number(totalPrice).toLocaleString("vi-vn")} đ</p>
                        </div>
                        <div className="flex justify-between text-white">
                            <p>Thuế(%)</p>
                            <p>6</p>
                        </div>
                        <div className="flex justify-between text-white">
                            <p>Giảm giá</p>
                            <p>12%</p>
                        </div>
                        <div className="bg-white h-[1px] opacity-40"></div>
                        <div className="flex justify-between text-white">
                            <p>Tổng thanh toán</p>
                            <p>{Number(totalPrice * (88 / 100) + totalPrice * (6 / 100)).toLocaleString("vi-vn")} đ</p>
                        </div>
                    </div>
                </div>
                <div>
                    <Button fullWidth sx={{ backgroundColor: "#f57c00", color: "white", marginTop: "10px" }} onClick={handleOrder}>Đặt món</Button>
                </div>
                <div>
                    <Button fullWidth sx={{ backgroundColor: "#0d47a1", color: "white", marginTop: "10px" }}>Đặt món và chọn bàn</Button>
                </div>
            </div>
        </div>
    )
}

export default Cart