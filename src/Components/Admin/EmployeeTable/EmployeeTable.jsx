import { Button, Grid } from "@mui/material"
import EmployeeCard from "../EmployeeCard/EmployeeCard"
import { useEffect, useState } from "react"
import axios from "axios"
import AddEmployeeModal from "../AddEmployeeModal/AddEmployeeModal"
import url from "../../../config/Config"

const EmployeeTable = () => {

    const [empList, setEmpList] = useState([])
    const [isOpenAddModal, setIsOpenAddModal] = useState(false)


    useEffect(() => {
        getAllEmployye()
    }, [])

    const getAllEmployye = async () => {
        const response = await axios.get(`${url}/api/User`)
        const { data } = response
        setEmpList(data)
        
    }

    const closeAddModal = ()=>{
        setIsOpenAddModal(false)
    }

    const openAddModal = ()=>{
        setIsOpenAddModal(true)
    }

    return (
        <div>
            <div>
                <h1 className="text-3xl font-semibold p-5 text-left">Quản lý nhân viên</h1>
            </div>
            <div className="text-right pr-10">
                <Button variant="contained" sx={{backgroundColor:"orange"}} onClick={openAddModal}>Thêm nhân viên</Button>
            </div>
            <div className="mt-10">
                <Grid container spacing={2}>
                    {
                        empList.length > 0 &&
                        empList.map((item, index) => (
                            <Grid item xs={6} key={index}>
                                <EmployeeCard emp={item} />
                            </Grid>
                        ))
                    }
                </Grid>
            </div>
            <AddEmployeeModal handleClose={closeAddModal} isOpen={isOpenAddModal} />
        </div>
    )
}

export default EmployeeTable