import { Box, Button, createTheme, FormControl, Grid, InputLabel, MenuItem, Pagination, Paper, Select, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow, ThemeProvider } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"
import "react-datepicker/dist/react-datepicker.css";

import DatePicker from "react-datepicker"
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import url from "../../../config/Config";
import { PieChart } from "@mui/x-charts";



const menu = [
    "Xem báo cáo doanh thu",
    "Xem báo cáo các món bán chạy",
    "Xem báo cáo tổng hóa đơn",
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



const Revenue = () => {
    const [title, setTitle] = useState("Xem báo cáo doanh thu")
    const [staffRevenue, setStaffRevenue] = useState([])
    const [staffRevenueActive, setStaffRevenueActive] = useState([])
    const [staffPage, setStaffPage] = useState(1)
    const [startDate, setStartDate] = useState(new Date());
    const [filterDate, setFilterDate] = useState("Chọn ngày")
    const [typeRevenue, setTypeRevenue] = useState([])
    const [dateRevenue, setDateRevenue] = useState(new Date())
    const [filterDate2, setFilterDate2] = useState("Chọn ngày")
    const [bestSelling, setBestSelling] = useState([])
    const [bestSellPage, setBestSellPage] = useState(1)
    const [bestSellingActive, setBestSelingActive] = useState([])
    const [filterDate3, setFilterDate3] = useState("Chọn ngày")
    const [dateBestSelling, setDateBestselling] = useState(new Date())
    const [order, setOrder] = useState([])
    const [orderActive, setOrderActive] = useState([])
    const [orderPage, setOrderPage] = useState(1)
    const [orderDate, setOrderDate] = useState(new Date())
    const [filterDate4, setFilterDate4] = useState("Chọn ngày")
    const [staff, setStaff] = useState([])
    const [staffActive, setStaffActive ] = useState(1)



    useEffect(() => {
        getAllStaffRevenue()
        getAllTypeRevenue()
        getAllBestSelling()
        getAllOrder()
        getAllStaff()
    }, [])

    useEffect(() => {
        if (staffRevenue.length > 0) {
            setStaffRevenueActive(staffRevenue.slice((staffPage - 1) * 5, 5))
        }
    }, [staffPage, staffRevenue])

    useEffect(() => {
        if (filterDate !== "Chọn ngày") {
            getAllStaffRevenueByTime()

        }
    }, [filterDate])

    useEffect(() => {
        if (filterDate2 !== "Chọn ngày") {
            getAllCategoryRevenueByTime()

        }
    }, [filterDate2])

    useEffect(() => {
        if (bestSelling.length > 0) {
            setBestSelingActive(bestSelling.slice((bestSellPage - 1) * 10, (bestSellPage - 1) * 10 + 10))

        }
    }, [bestSellPage, bestSelling])

    useEffect(() => {
        handleChangeDateBestSelling()
    }, [dateBestSelling])

    useEffect(() => {
        if (order.length > 0) {
            setOrderActive(order.slice((orderPage - 1) * 8, (orderPage - 1) * 8 + 8))
        }        
        else{
            setOrderActive([])
        }
    }, [order, orderPage])

    useEffect(() => {
        getAllOrderByDate()
    }, [orderDate])

    const getAllStaffRevenue = async () => {
        try {
            const response = await axios.get(`${url}/api/Report/total-revenue-employee`)
            const { data } = response
            setStaffRevenue(data)
        } catch (error) {

        }
    }

    const getAllStaffRevenueByTime = async () => {
        try {
            const response = await axios.post(`${url}/api/Report/total-revenue-employee-time`, { date: filterDate })
            const { data } = response
            setStaffRevenueActive(data)
        } catch (error) {

        }
    }

    const getAllTypeRevenue = async () => {
        try {
            const response = await axios.get(`${url}/api/Report/total-revenue-category`)
            const { data } = response
            setTypeRevenue(data.map((item, index) => ({ id: index, label: item.categoryName, value: item.totalRevenue })))
            setFilterDate2("Chọn ngày")
        } catch (error) {

        }
    }



    const handleChangeDate = (date, callback, callback2) => {
        callback2(date)
        let day = date.getDate()
        let month = date.getMonth()
        let year = date.getFullYear()
        if (day < 10) {
            day = "0" + date.getDate()
        }
        if (month < 10) {
            month = "0" + Number(date.getMonth() + 1)
        }
        else {
            month = Number(month + 1)
        }


        callback(day + "-" + month + "-" + year)
    }

    const handleClickAll = () => {
        setStaffRevenueActive(staffRevenue)
        setStaffPage(1)
        setFilterDate("Chọn ngày")
    }

    const getStaffRevenueByMonth = async () => {
        try {
            if (filterDate === "Chọn ngày")
                return
            const month = startDate.getMonth()
            const newMonth = month + 1

            let year = startDate.getFullYear()
            const date = (newMonth < 10) ? "0" + newMonth + "-" + year : newMonth + "-" + year

            const response = await axios.post(`${url}/api/Report/total-revenue-employee-time-month`, { date })
            const { data } = response
            setStaffRevenueActive(data)
            setStaffPage(1)
        } catch (error) {

        }
    }

    const getAllCategoryRevenueByMonth = async () => {
        try {
            if (filterDate2 === "Chọn ngày")
                return
            const month = dateRevenue.getMonth()
            const newMonth = month + 1

            let year = dateRevenue.getFullYear()
            const date = (newMonth < 10) ? "0" + newMonth + "-" + year : newMonth + "-" + year

            const response = await axios.post(`${url}/api/Report/total-revenue-category-time-month`, { date })
            const { data } = response
            setTypeRevenue(data.map((item, index) => ({ id: index, label: item.categoryName, value: item.totalRevenue })))

        } catch (error) {

        }
    }

    const getAllCategoryRevenueByTime = async () => {
        try {
            const response = await axios.post(`${url}/api/Report/total-revenue-category-time`, { date: filterDate2 })
            const { data } = response
            setTypeRevenue(data.map((item, index) => ({ id: index, label: item.categoryName, value: item.totalRevenue })))
        } catch (error) {

        }
    }

    const getAllBestSelling = async () => {
        try {
            const response = await axios.get(`${url}/api/Report/get-all-orderitem-bestseling`)
            const { data } = response
            setBestSelling(data)
            setFilterDate3("Chọn ngày")
            setBestSellPage(1)
        } catch (error) {

        }
    }

    const handleChangeBestSellingPage = (e, value) => {
        setBestSellPage(value)
    }

    const handleChangeDateBestSelling = async () => {
        try {
            if (filterDate3 === "Chọn ngày")
                return
            const response = await axios.post(`${url}/api/Report/get-all-orderitem-bestseling-currentday`, { date: filterDate3 })
            const { data } = response
            setBestSelling(data)
            setBestSellPage(1)

        } catch (error) {

        }
    }

    const getAllBestSellingByMonth = async () => {
        try {
            if (filterDate3 === "Chọn ngày")
                return
            const month = dateBestSelling.getMonth()
            const newMonth = month + 1

            let year = dateBestSelling.getFullYear()

            const date = (newMonth < 10) ? "0" + newMonth + "-" + year : newMonth + "-" + year
            const response = await axios.post(`${url}/api/Report/get-all-orderitem-bestseling-currentmonth`, { date: date })
            const { data } = response

            setBestSelling(data)
            setBestSellPage(1)
        } catch (error) {

        }
    }

    const getAllOrder = async () => {
        try {
            const response = await axios.get(`${url}/api/Report/get-all-order`)
            const { data } = response
            setOrder(data)
            setOrderPage(1)
            setFilterDate4("Chọn ngày")
            setStaffActive(1)
        } catch (error) {

        }
    }

    const getAllOrderByDate = async () => {
        setStaffActive(1)
        try {
            if (filterDate4 === "Chọn ngày")
                return
            const response = await axios.post(`${url}/api/Report/get-all-order-currentday`, { date: filterDate4 })
            const { data } = response
            setOrder(data)            
            setOrderPage(1)
            console.log(data);
            
        } catch (error) {
            
        }
    }

    const getAllOrderByMonth = async () => {
        try {
            if (filterDate4 === "Chọn ngày")
                return
            const month = orderDate.getMonth()
            const newMonth = month + 1

            let year = orderDate.getFullYear()

            const date = (newMonth < 10) ? "0" + newMonth + "-" + year : newMonth + "-" + year
            const response = await axios.post(`${url}/api/Report/get-all-order-currentmonth`, { date: date })
            const { data } = response
            setOrder(data)
            setOrderPage(1)
        } catch (error) {

        }
    }

    const getAllStaff = async () => {
        try {
            const response = await axios.get(`${url}/api/User`)
            const { data } = response
            setStaff(data.filter(item=>(item.role==="Staff"||item.role==="Manager"||item.role==="Owner")))
        } catch (error) {

        }
    }

    const handleChangeStaff = (e)=>{
        setStaffActive(e.target.value)
        getAllOrderByStaff(e.target.value)
    }

    const getAllOrderByStaff = async(id)=>{
        setFilterDate4("Chọn ngày")
        try {
            const user = staff.find((item)=>(item.userId===id))
            const fullname  = user.fullName
            
            if(!fullname)
                return

            const response = await axios.post(`${url}/api/Report/get-all-order-fullname`, {date: fullname})
            
            const {data} = response
            
            setOrder(data)
            setOrderPage(1)
        } catch (error) {
            
        }
    }


    return (
        <div>
            <div>
                <h1 className="text-3xl font-semibold p-5 text-left">Doanh thu của cửa hàng</h1>
            </div>
            <div className="flex justify-around">
                {
                    menu.map((item, index) => (
                        <div key={index} onClick={() => setTitle(item)} className={`bg-[#1a237e] px-5 py-3 text-white rounded-md hover:opacity-70 active:opacity-50 cursor-pointer ${item !== title && 'opacity-80'}`}>
                            <p>{item}</p>
                        </div>
                    ))
                }
            </div>
            {
                title === "Xem báo cáo doanh thu" &&
                (<div className="flex mt-10 border max-h-[350px]">
                    <div className="w-[50%] p-5 shadow-md">
                        <h1 className="text-center font-bold">Theo Nhân Viên</h1>
                        <div className="mt-5 text-left flex space-x-3 items-center">
                            <div className="p-2 border flex items-center w-[25%]">
                                <label htmlFor="dateStart" className="font-semibold flex items-center">{filterDate} <CalendarMonthIcon className="ml-2" /> </label>

                                <DatePicker selected={startDate} onChange={(date) => handleChangeDate(date, setFilterDate, setStartDate)} id="dateStart" className="hidden" />
                            </div>
                            <div>
                                <Button sx={{ bgcolor: "#303030", color: "white", textTransform: "none" }} variant="contained" onClick={getStaffRevenueByMonth}>Xem theo tháng</Button>
                            </div>
                            <div>
                                <Button sx={{ bgcolor: "#303030", color: "white", textTransform: "none" }} variant="contained" onClick={handleClickAll}>Xem tất cả</Button>
                            </div>

                        </div>
                        <div className="mt-5">
                            <div className="flex justify-between">
                                <h1 className="font-semibold">Tên Nhân Viên</h1>
                                <h1 className="font-semibold">Tổng Doanh thu</h1>
                            </div>

                            <div>
                                {
                                    staffRevenueActive.length > 0 &&
                                    staffRevenueActive.map((item, index) => (
                                        <div key={index} className="flex justify-between">
                                            <p>{item.fullName}</p>
                                            <p>{Number(item.totalRevenue).toLocaleString("vi-VN")} VND</p>
                                        </div>
                                    ))
                                }
                            </div>
                            <div className="flex justify-center mt-5">
                                <Pagination count={Math.ceil(staffRevenue.length / 5)} page={staffPage} onChange={(e, value) => setStaffPage(value)} color="secondary" />
                            </div>
                        </div>
                    </div>
                    <div className="w-[1px] bg-black"></div>
                    <div className="w-[50%] p-5 shadow-md">
                        <h1 className="text-center font-bold">Theo Danh Mục</h1>
                        <div className="mt-5 text-left flex space-x-3 items-center">
                            <div className="p-2 border flex items-center w-[25%]">
                                <label htmlFor="dateEnd" className="font-semibold flex items-center">{filterDate2} <CalendarMonthIcon className="ml-2" /> </label>

                                <DatePicker selected={dateRevenue} onChange={(date) => handleChangeDate(date, setFilterDate2, setDateRevenue)} id="dateEnd" className="hidden" />
                            </div>
                            <div>
                                <Button sx={{ bgcolor: "#303030", color: "white", textTransform: "none" }} variant="contained" onClick={getAllCategoryRevenueByMonth}>Xem theo tháng</Button>
                            </div>
                            <div>
                                <Button sx={{ bgcolor: "#303030", color: "white", textTransform: "none" }} variant="contained" onClick={getAllTypeRevenue}>Xem tất cả</Button>
                            </div>

                        </div>
                        <div className="mt-5">
                            <div>
                                {
                                    typeRevenue.length > 0 &&
                                    <PieChart
                                        series={[
                                            {
                                                data: typeRevenue,
                                                outerRadius: 80,
                                            },
                                        ]}
                                        width={400}
                                        height={200}
                                    />
                                }

                            </div>
                        </div>
                    </div>
                </div>)
            }
            {
                title === "Xem báo cáo các món bán chạy" && (
                    <div className="border p-5 w-[70%] m-auto mt-10">

                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <div className="flex items-center space-x-3">
                                    <div className="p-2 border flex items-center w-[25%]">
                                        <label htmlFor="dateBestSelling" className="font-semibold flex items-center">{filterDate3} <CalendarMonthIcon className="ml-2" /> </label>

                                        <DatePicker selected={dateBestSelling} onChange={(date) => handleChangeDate(date, setFilterDate3, setDateBestselling)} id="dateBestSelling" className="hidden" />
                                    </div>
                                    <div>
                                        <Button sx={{ bgcolor: "#303030", color: "white", textTransform: "none" }} variant="contained" onClick={getAllBestSellingByMonth}>Xem theo tháng</Button>
                                    </div>
                                    <div>
                                        <Button sx={{ bgcolor: "#303030", color: "white", textTransform: "none" }} variant="contained" onClick={getAllBestSelling}>Xem tất cả</Button>
                                    </div>
                                </div>
                            </Grid>
                            <Grid item xs={3}>
                                <h1 className="font-semibold">Tên món</h1>
                            </Grid>
                            <Grid item xs={6}>
                                <h1 className="font-semibold">Số lượng bán ra</h1>
                            </Grid>
                            <Grid item xs={3}></Grid>
                            <Grid item xs={12}>
                                <div className="h-[1px] bg-black mt-2"></div>
                            </Grid>
                            {bestSelling.length > 0 &&
                                bestSellingActive.map((item, index) => (
                                    <Grid container key={index} alignItems="center" sx={{ marginTop: "15px" }}>
                                        <Grid item xs={3}>
                                            <p className="text-left px-5">{item.foodName}</p>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <div className="text-right h-3 w-[80%] bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-full"></div>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <p>{item.quantitySold}</p>
                                        </Grid>
                                    </Grid>
                                ))}
                            <Grid item xs={12}>
                                <div className="flex justify-center">
                                    <Pagination page={bestSellPage} onChange={handleChangeBestSellingPage} count={Math.ceil(bestSelling.length / 10)} color="secondary" />
                                </div>

                            </Grid>
                        </Grid>

                    </div>

                )

            }
            {
                title === "Xem báo cáo tổng hóa đơn" &&
                (
                    <div className="border p-5 w-[70%] m-auto mt-10">
                        <div className="flex items-center space-x-5 mb-5">
                            <div>FILTER</div>

                            <div className="p-2 border flex items-center w-[25%]">
                                <label htmlFor="orderDate" className="font-semibold flex items-center">{filterDate4} <CalendarMonthIcon className="ml-2" /> </label>

                                <DatePicker selected={orderDate} onChange={(date) => handleChangeDate(date, setFilterDate4, setOrderDate)} id="orderDate" className="hidden" />
                            </div>
                            <div>
                                <Button sx={{ bgcolor: "#303030", color: "white", textTransform: "none" }} variant="contained" onClick={getAllOrderByMonth}>Xem theo tháng</Button>
                            </div>
                            <div>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Nhân viên</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={staffActive}
                                        label="Nhân viên"
                                        sx={{ minWidth: 150 }}
                                    onChange={(e)=>handleChangeStaff(e)}
                                    >
                                        {staff.length > 0 && staff.map((item) => (<MenuItem  key={item.userId} value={item.userId}>{item.fullName}</MenuItem>))
                                        }
                                        <MenuItem value={30}>Thirty</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                            <div>
                                <Button sx={{ bgcolor: "#303030", color: "white", textTransform: "none" }} variant="contained" onClick={getAllOrder}>Xem tất cả</Button>
                            </div>
                        </div>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell>Nhân viên đứng vầy</StyledTableCell>
                                        <StyledTableCell align="center">Thời gian bán</StyledTableCell>
                                        <StyledTableCell align="center">Giảm giá</StyledTableCell>
                                        <StyledTableCell align="center">Thuế</StyledTableCell>
                                        <StyledTableCell align="center">Tổng thanh toán</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {orderActive.length > 0 && orderActive.map((row, index) => (
                                        <StyledTableRow key={row.name} key={index}>
                                            <StyledTableCell component="th" scope="row">
                                                {row.fullName}
                                            </StyledTableCell>
                                            <StyledTableCell align="center">{new Date(row.orderTime).toLocaleDateString("vi-VN")}</StyledTableCell>
                                            <StyledTableCell align="center">{row.discount}%</StyledTableCell>
                                            <StyledTableCell align="center">{row.tax}%</StyledTableCell>
                                            <StyledTableCell align="center">{Number(row.totalAmount).toLocaleString("vi-VN")} VND</StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <div className="flex justify-center mt-5">
                            <Pagination count={Math.ceil(order.length / 8)} page={orderPage} onChange={(e, value) => setOrderPage(value)} color="secondary" />

                        </div>

                    </div>
                )
            }
        </div>
    )
}

export default Revenue