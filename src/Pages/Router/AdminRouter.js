import { Grid } from "@mui/material"
import Navigate from "../../Components/Admin/Navigate/Navigate"
import { Route, Routes } from "react-router-dom"
import FoodTable from "../../Components/Admin/FoodTable/FoodTable"
import EmployeeTable from "../../Components/Admin/EmployeeTable/EmployeeTable"
import Material from "../../Components/Admin/Material/Material"

const AdminRouter = () => {
    return (
        <div>
            <div>
                <Grid container spacing={2}>
                    <Grid item xs={2}>
                        <Navigate />
                    </Grid>
                    <Grid item xs={10}>
                        <div className="h-[100vh] overflow-scroll">
                            <Routes>
                                <Route path="/food" element={<FoodTable />}></Route>
                                <Route path="/employee" element={<EmployeeTable />}></Route>
                                <Route path="product" element={<Material />}></Route>
                            </Routes>
                        </div>

                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default AdminRouter