import { Box, Button, Pagination, Paper, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios"
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSearchParams } from "react-router-dom";
import FoodUpdateModal from "../FoodUpdateModal/FoodUpdateModal";
import DeletedConfirm from "../Confirm/DeletedComfirm";


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));




const FoodTable = () => {
    const [categories, setCategories] = useState([])
    const [categoryActive, setCategoryActive] = useState()
    const [food, setFood] = useState([])
    const [filteredFood, setFilteredFood] = useState([])
    const [foodPage, setFoodPage] = useState([])
    const [page, setPage] = useState(1)
    const [seachParams, setSearchParams] = useSearchParams()
    const [isOpenUpdateModal, setIsOpenUpdateModal] = useState(false)
    const [foodUpdate, setFoodUpdate] = useState({})
    const [isUpdate, setIsUpdate] = useState(false)
    const [foodDeleted, setFoodDeleted] = useState()
    const [isOpenDeletedModal, setIsOpenDeletedModal] = useState(false)

    const closeUpdateModal = ()=>{
        setIsOpenUpdateModal(false)
    }

    const openUpdateModal = (food)=>{
        setIsOpenUpdateModal(true)
        handleChangeUpdateFood(food)
    }

    useEffect(() => {
        getAllFood()
        getAllCategories()
    }, [])

    useEffect(() => {
        if (categories.length > 0) {
            if (!categoryActive) {
                setCategoryActive(categories[0].categoryId)
            }
        }
    }, [categories])

    useEffect(() => {
        if (categories.length > 0) {
            getFoodByCatgoryId()
        }
    }, [categoryActive, food])

    useEffect(()=>{
        seachParams.set("category", categoryActive)
        setSearchParams(seachParams)
        setPage(1)

    }, [categoryActive])

    useEffect(()=>{
        seachParams.set("page", page)
        setSearchParams(seachParams)        
    }, [page])

    useEffect(()=>{
        const newFoodPage = filteredFood.slice((page - 1)*5, (page - 1) * 5 + 5)
        setFoodPage(newFoodPage)
        
    }, [page, filteredFood])
    
    const getAllCategories = async () => {
        try {
            const response = await axios.get("http://localhost:5248/api/Food/get-all-category")
            const { data } = response
            setCategories(data)
        } catch (error) {

        }
    }



    const getAllFood = async () => {
        try {
            const response = await axios.get("http://localhost:5248/api/Food/get-all-food-items")
            const { data } = response
            setFood(data)
        } catch (error) {

        }
    }

    const getFoodByCatgoryId = () => {
        const filterFood = food.filter((item) => (item.categoryId === categoryActive))
        setFilteredFood(filterFood)

    }

    const handleChangeCategory = (categoryId) => {
        setCategoryActive(categoryId)
    }

    const handleChangePage = (event, value)=>{
        setPage(value)                        
    }

    const handleChangeUpdateFood = (food)=>{        
        setFoodUpdate(food)
        setIsUpdate(true)
    }

    const handleOpenAddModal = ()=>{
        setIsOpenUpdateModal(true)
        setIsUpdate(false)
    }

    const handleRefresh = ()=>{
        getAllFood()
    }

    const handleOnChangeDeletedFood = (id)=>{        
        setFoodDeleted(id)
        handleOpenDeletedFoodModal()
    }

    const handleCloseDeletedFoodModal = ()=>{
        setIsOpenDeletedModal(false)
    }

    const handleOpenDeletedFoodModal = ()=>{
        setIsOpenDeletedModal(true)
    }


    return (
        <div>
            <div>
                <h1 className="text-3xl font-semibold p-5 text-left">Quản lý món ăn</h1>
                <div className="text-left space-x-3">
                    <Button variant="contained"sx={{textTransform:"none", bgcolor:"orange", fontWeight:"600"}} onClick={handleOpenAddModal}>Thêm món mới</Button>
                    <Button variant="contained"sx={{textTransform:"none", bgcolor:"#303030", fontWeight:"600"}}onClick={handleRefresh} >Làm mới</Button>

                </div>
                <div className="flex justify-evenly mt-5">
                    {
                        categories.length > 0
                        && categories.map((item) => (
                            <div onClick={() => handleChangeCategory(item.categoryId)} key={item.categoryId} className={` text-white px-3 py-2 rounded-lg cursor-pointer hover:opacity-70 active:opacity-50 ${item.categoryId === categoryActive ? 'bg-orange-700' : 'bg-[#5FAF9F]'}`}>
                                <p>{item.categoryName}</p>
                            </div>
                        ))
                    }
                </div>
                <div className="mt-10">
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 700 }} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>Món ăn</StyledTableCell>
                                    <StyledTableCell align="center">Giá niêm yết</StyledTableCell>
                                    <StyledTableCell align="center">Giá bán ra</StyledTableCell>
                                    <StyledTableCell align="center">Tình trạng món</StyledTableCell>
                                    <StyledTableCell align="center">Giảm</StyledTableCell>
                                    <StyledTableCell align="center">Thao tác</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    foodPage.length > 0 &&
                                    foodPage.map((row) => (
                                        <StyledTableRow key={row.name}>
                                            <StyledTableCell component="th" scope="row">
                                                {
                                                    <div className="flex items-center space-x-3">
                                                        <img src={row.imageUrl} className="w-12 h-12 rounded-xl" alt="" />
                                                        <p>{row.foodName}</p>
                                                    </div>
                                                }
                                            </StyledTableCell>
                                            <StyledTableCell align="center">{Number(row.priceListed).toLocaleString("vi-vn")} đ</StyledTableCell>
                                            <StyledTableCell align="center">{Number(row.priceCustom).toLocaleString("vi-vn")} đ</StyledTableCell>
                                            <StyledTableCell align="center">{row.status}</StyledTableCell>
                                            <StyledTableCell align="center">{Number(row.priceListed - row.priceCustom).toLocaleString("vi-vn")} đ</StyledTableCell>
                                            <StyledTableCell align="center">
                                                <div>
                                                    <CreateIcon sx={{ color: "blue", cursor: "pointer", "&:hover": { opacity: 0.7 }, ":active": { opacity: 0.5 } }} onClick={()=>openUpdateModal(row)} />
                                                    <DeleteIcon sx={{ color: "red", cursor: "pointer", "&:hover": { opacity: 0.7 }, ":active": { opacity: 0.5 } }} onClick={()=>handleOnChangeDeletedFood(row.foodItemId)} />
                                                </div>
                                            </StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
                <div className="w-full mt-5">
                    <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
                        <Pagination count={Math.ceil(filteredFood.length / 5)} color="secondary" page={page} onChange={handleChangePage} />
                    </Box>
                </div>
            </div>
            <FoodUpdateModal open={isOpenUpdateModal} handleClose={closeUpdateModal} food={foodUpdate} categories={categories} isUpdate={isUpdate} />
            <DeletedConfirm open={isOpenDeletedModal} handleClose={handleCloseDeletedFoodModal} foodId={foodDeleted} />
        </div>
    )
}

export default FoodTable