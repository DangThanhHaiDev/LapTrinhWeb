import { Button, Pagination, Paper, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow } from "@mui/material";
import axios from "axios"
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import ImportProductModal from "../ImportProductModal/ImportProductModal";
import CancelConfirmModal from "../CancelConfirmModal/CancelConfirmModal.jsx";


const type = [
    "Thực phẩm",
    "Gia vị",
    "Nguyên liệu"
    , "Sắp hết hạn",
    "Hết hạn sử dụng",
    "Sắp hết hàng",
    "Hết hàng"
]

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





const Material = () => {
    const [title, setTitle] = useState("Thực phẩm")
    const [items, setItems] = useState([])
    const [food, setFood] = useState([])
    const [spice, setSpice] = useState([])
    const [material, setMaterial] = useState([])
    const [warningFood, setWarningFood] = useState([])
    const [redFood, setRedFood] = useState([])
    const [warningQuantityFood, setWarningQuantityFood] = useState([])
    const [redQuantityFood, setRedQuantityFood] = useState([])
    const [arrActive, setArrActive] = useState([])
    const location = useLocation()
    const navigate = useNavigate()
    const [page, setPage] = useState(1)
    const [count, setCount] = useState(0)
    const [isOpenImportProductModal, setIsOpenImportProductModal] = useState(false)
    const [isOpenCancelConfirmModal, setIsOpenConfirmModal] = useState(false)
    const [materialAdd, setMaterialAdd] = useState()

    const openImportProductModal = () => {
        setIsOpenImportProductModal(true)
    }

    const closeImportProductModal = () => {
        setIsOpenImportProductModal(false)
    }
    const openCancelConfirmModal = () => {
        setIsOpenConfirmModal(true)
    }

    const closeCancelConfirmModal = () => {
        setIsOpenConfirmModal(false)
    }
    const handleChangeTitle = (t) => {
        setTitle(t)
    }

    useEffect(() => {
        getAllItems()
    }, [])

    useEffect(() => {
        const params = new URLSearchParams(location.search)
        params.set("title", title)
        params.set("page", 1)
        navigate(`?${params.toString()}`, { replace: true });
        setPage(1)
    }, [title])

    useEffect(() => {
        const params = new URLSearchParams(location.search)
        params.set("page", page)
        navigate(`?${params.toString()}`, { replace: true });
    }, [page])

    useEffect(() => {
        if (items.length > 0) {
            getActiveArray()
        }
    }, [title, page, items])

    const filter = (data) => {
        setFood(data.filter(i => (i.materialType === "Thực phẩm")))
        setSpice(data.filter(i => (i.materialType === "Gia vị")))
        setMaterial(data.filter(i => (i.materialType === "Nguyên liệu")))
        setWarningFood(data.filter(i => moment(i.expirationDate).diff(moment(), "days") < 3 && moment(i.expirationDate).diff(moment(), "days") > 0));
        setRedFood(data.filter(i => moment(i.expirationDate).diff(moment(), "days") < 1));
        setWarningQuantityFood(data.filter(i => (i.quantity < i.minQuantity & i.quantity > 0)))
        setRedQuantityFood(data.filter(i => (i.quantity === 0)))
    }

    const getActiveArray = () => {
        if (title === "Thực phẩm") {
            setArrActive(food.slice((page - 1) * 8, page * 8))
            setCount(Math.ceil(food.length / 8))
        }
        else if (title === "Gia vị") {
            setArrActive(spice.slice((page - 1) * 8, page * 8))
            setCount(Math.ceil(spice.length / 8))
        }
        else if (title === "Nguyên liệu") {
            setArrActive(material.slice((page - 1) * 8, page * 8))
            setCount(Math.ceil(material.length / 8))

        }
        else if (title === "Sắp hết hạn") {
            setArrActive(warningFood.slice((page - 1) * 8, page * 8))
            setCount(Math.ceil(warningFood.length / 8))
        }
        else if (title === "Hết hạn sử dụng") {
            setArrActive(redFood.slice((page - 1) * 8, page * 8))
            setCount(Math.ceil(redFood.length / 8))
        }
        else if (title === "Sắp hết hàng") {
            setArrActive(warningQuantityFood.slice((page - 1) * 8, page * 8))
            setCount(Math.ceil(warningQuantityFood.length / 8))
        }
        else if (title === "Hết hàng") {
            setArrActive(redQuantityFood.slice((page - 1) * 8, page * 8))
            setCount(Math.ceil(redQuantityFood.length / 8))
        }
    }


    const getAllItems = async () => {
        try {
            const response = await axios.get("http://localhost:5248/api/Inventory/get-all-material")
            setItems(response.data)
            filter(response.data)
        } catch (error) {

        }
    }

    const handleClickAddProduct = (row) => {
        setMaterialAdd(row)
        openImportProductModal()
    }

    const handleClickCancelProduct = (row)=>{
        setMaterialAdd(row)
        openCancelConfirmModal()
    }

    return (
        <div>
            <div>
                <div>
                    <h1 className="text-3xl font-semibold p-5 text-left">Các mặt hàng còn trong kho</h1>
                </div>
                <div className="text-left"><Button variant="contained" sx={{ bgcolor: "#303030" }} onClick={getAllItems}>Làm mới</Button></div>
                <div className="flex space-x-10 mt-5">
                    {type.map((item, index) => (
                        <p onClick={(() => handleChangeTitle(item))} className={` text-white px-5 py-2 rounded-md cursor-pointer hover:opacity-70 active:opacity-50 ${title !== item ? 'bg-orange-400' : 'bg-orange-600'}`} key={index}>{item}</p>
                    ))}
                </div>
                <div className="mt-10">
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 700 }} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell align="center">Tên</StyledTableCell>
                                    <StyledTableCell align="center">Số lượng</StyledTableCell>
                                    <StyledTableCell align="center">Đơn vị tính</StyledTableCell>
                                    <StyledTableCell align="center">Ngày nhập</StyledTableCell>
                                    <StyledTableCell align="center">Ngày hết hạn</StyledTableCell>
                                    <StyledTableCell align="center">Thao tác</StyledTableCell>


                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {arrActive.length > 0 && arrActive.map((row) => (
                                    <StyledTableRow key={row.name}>

                                        <StyledTableCell align="center">{row.materialName}</StyledTableCell>
                                        <StyledTableCell align="center">{row.quantity}</StyledTableCell>
                                        <StyledTableCell align="center">{row.unit}</StyledTableCell>
                                        <StyledTableCell align="center">{moment(row.importDate).format("DD/MM/YYYY")}</StyledTableCell>
                                        <StyledTableCell align="center">{moment(row.expirationDate).format("DD/MM/YYYY")}</StyledTableCell>
                                        <StyledTableCell align="center">
                                            <div className="space-x-2 text-left">
                                                <Button variant="contained" sx={{ backgroundColor: "green" }} onClick={() => handleClickAddProduct(row)} >Nhập thêm</Button>
                                                {
                                                    moment(row.expirationDate).diff(moment(), "days") < 1 && (
                                                        <Button variant="contained" sx={{ backgroundColor: "red" }} onClick={()=>handleClickCancelProduct(row)}>
                                                            Loại bỏ
                                                        </Button>
                                                    )
                                                }

                                            </div>
                                        </StyledTableCell>


                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
                <div className="w-full flex justify-center mt-10">
                    <Pagination page={page} count={count} onChange={(e, value) => setPage(value)} color="secondary" size="large" />
                </div>
            </div>
            <ImportProductModal open={isOpenImportProductModal} product={materialAdd} handleClose={closeImportProductModal} />
            <CancelConfirmModal open={isOpenCancelConfirmModal} handleClose={closeCancelConfirmModal} product={materialAdd} />
        </div>
    )
}

export default Material