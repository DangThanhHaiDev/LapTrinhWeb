import { Button, Grid, TextField } from "@mui/material"
import FoodCard from "../FoodCard/FoodCard"
import "./HomePage.scss"
import Cart from "../Cart/Cart"
import axios from "axios"
import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux";


const HomePage = () => {
    const [food, setFood] = useState([])
    const { category } = useSelector(state => state.categoryReducer)
    const [filteredFood, setFilteredFood] = useState([])
    const searchRef = useRef(null)

    useEffect(() => {
        getAllFood()
    }, [])

    useEffect(() => {
        if (!category) {
            getFoodByCategory(2)
        }
        else {
            getFoodByCategory()
            resetSearch()
        }
    }, [category, food])

    const getFoodByCategory = (init) => {
        if (init) {
            const filterFood = food.filter((item) => (item.categoryId === init))
            setFilteredFood(filterFood)
            return
        }
        const filterFood = food.filter((item) => (item.categoryId === category))
        setFilteredFood(filterFood)

    }

    const getAllFood = async () => {
        try {
            const response = await axios.get("http://localhost:5248/api/Food/get-all-food-items")
            const { data } = response
            setFood(data)
        } catch (error) {

        }
    }

    const handleOnChangeSearch = (e) => {
        const filterFood = food.filter((item) => ((!category || item.categoryId === category) && item.foodName.toLowerCase().includes(e.target.value.trim().toLowerCase())))
        console.log(filterFood);

        setFilteredFood(filterFood)
    }

    const resetSearch = () => {
        searchRef.current.value = ""
    }

    return (
        <div className="bg-black">
            <div className="w-[80%] m-auto">
                <div>
                    <div className="bg-[#212121] p-2">
                        <TextField className="text-white" label="Nhập món ăn cần tìm kiếm" sx={{
                            input: { color: "white" },
                            label: { color: "white" },
                            "& .MuiOutlinedInput-root": {
                                "& fieldset": { borderColor: "white" }, // Viền mặc định
                                "&:hover fieldset": { borderColor: "white" }, // Viền khi hover
                                "&.Mui-focused fieldset": { borderColor: "white" },
                            },
                            width: "80%",
                            opacity: .7
                        }} fullWidth size="small" onChange={e => handleOnChangeSearch(e)} inputRef={searchRef} />

                    </div>

                    <div className="bg-black">
                        <Grid container sx={{ margin: 0, padding: 0 }} >
                            <Grid item xs={8} sx={{ backgroundColor: "#303030" }} className="border border-orange-950">
                                <Grid item xs={12}>
                                    <h1 className="text-white text-2xl">Mời bạn gọi món</h1>
                                </Grid>
                                <div className="w-full max-h-[520px] overflow-scroll scroll-none no-scrollbar px-5 mt-3">
                                    <Grid container spacing={3} >
                                        {
                                            filteredFood.length > 0 &&
                                            filteredFood.map((item) => (
                                                <Grid item xs={4} key={item.foodItemId}>
                                                    <FoodCard food={item} />
                                                </Grid>
                                            ))
                                        }

                                    </Grid>
                                </div>
                            </Grid>
                            <Grid item xs={4} sx={{ padding: 0, margin: 0 }} className="border border-orange-950">
                                <Cart />
                            </Grid>

                        </Grid>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePage