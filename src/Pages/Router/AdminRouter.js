import { createTheme, Grid, ThemeProvider } from "@mui/material"
import Navigate from "../../Components/Admin/Navigate/Navigate"
import { Route, Routes } from "react-router-dom"
import FoodTable from "../../Components/Admin/FoodTable/FoodTable"
import EmployeeTable from "../../Components/Admin/EmployeeTable/EmployeeTable"
import Material from "../../Components/Admin/Material/Material"
import { useEffect, useState } from "react"
import Revenue from "../../Components/Admin/Revenue/Revenue"
import Account from "../../Components/Admin/Account/Account"

const AdminRouter = () => {

    const account = localStorage.getItem("user")
    const [user, setUser] = useState(null)

    useEffect(() => {
        if (account) {
            setUser(JSON.parse(account))
        }
    }, [])


    return (
        <div>
            {
                user && user.role === "Owner" && (
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
                                        <Route path="/product" element={<Material />}></Route>
                                        <Route path="/Revenue" element={
                                            <Revenue />
                                        }></Route>
                                        <Route path="/Account" element={<Account />}></Route>
                                    </Routes>
                                </div>

                            </Grid>
                        </Grid>
                    </div>
                )
            }

        </div>
    )
}

export default AdminRouter